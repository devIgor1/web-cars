import { ReactNode, createContext, useState, useEffect } from "react"

type AuthContextData = {
  signed: boolean
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

  return (
    <AuthContext.Provider value={{ signed: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
