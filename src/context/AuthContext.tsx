import { onAuthStateChanged } from "firebase/auth"
import { ReactNode, createContext, useState, useEffect } from "react"
import { auth } from "../services/firebaseConnection"

type AuthContextData = {
  signed: boolean
  loadingAuth: boolean
  handleUserInfo: ({ name, email, uid }: UserProps) => void
  user: UserProps | null
}

interface AuthProviderProps {
  children: ReactNode
}

interface UserProps {
  uid: string
  name: string | null
  email: string | null
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email,
        })
        setLoadingAuth(false)
      } else {
        setUser(null)
        setLoadingAuth(false)
      }
    })

    return () => {
      unsub
    }
  }, [])

  function handleUserInfo({ email, name, uid }: UserProps) {
    setUser({
      name,
      email,
      uid,
    })
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, loadingAuth, handleUserInfo, user }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
