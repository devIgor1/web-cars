import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebaseConnection'

export interface UserData {
  uid: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  displayName: string
  createdAt: Date
  lastLoginAt: Date
  role: 'user' | 'admin'
  isActive: boolean
}

interface AuthContextType {
  currentUser: User | null
  userData: UserData | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, firstName: string, lastName: string, phone?: string) => Promise<void>
  logout: () => Promise<void>
  updateUserData: (data: Partial<UserData>) => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  const login = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      
      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserData
        // Update last login time
        await updateDoc(doc(db, 'users', user.uid), {
          lastLoginAt: new Date()
        })
        setUserData({ ...userData, lastLoginAt: new Date() })
      }
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code))
    }
  }

  const register = async (email: string, password: string, firstName: string, lastName: string, phone?: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      const displayName = `${firstName} ${lastName}`
      
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName
      })

      // Create user document in Firestore
      const userData: UserData = {
        uid: user.uid,
        email: user.email!,
        firstName,
        lastName,
        phone: phone || '',
        displayName,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        role: 'user',
        isActive: true
      }

      await setDoc(doc(db, 'users', user.uid), userData)
      setUserData(userData)
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code))
    }
  }


  const logout = async () => {
    try {
      await signOut(auth)
      setUserData(null)
    } catch (error: any) {
      throw new Error('Failed to sign out')
    }
  }

  const updateUserData = async (data: Partial<UserData>) => {
    if (!currentUser) throw new Error('No user logged in')
    
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        ...data,
        lastLoginAt: new Date()
      })
      
      if (userData) {
        setUserData({ ...userData, ...data })
      }
    } catch (error: any) {
      throw new Error('Failed to update user data')
    }
  }

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No user found with this email address'
      case 'auth/wrong-password':
        return 'Incorrect password'
      case 'auth/email-already-in-use':
        return 'An account with this email already exists'
      case 'auth/weak-password':
        return 'Password should be at least 6 characters'
      case 'auth/invalid-email':
        return 'Invalid email address'
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later'
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection'
      default:
        return 'An error occurred. Please try again'
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      
      if (user) {
        // Load user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData
            setUserData(userData)
          }
        } catch (error) {
          console.error('Error loading user data:', error)
        }
      } else {
        setUserData(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userData,
    login,
    register,
    logout,
    updateUserData,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}


