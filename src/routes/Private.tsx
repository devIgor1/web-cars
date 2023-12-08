import { useContext, ReactNode } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

export function Private({ children }: { children: ReactNode }): any {
  const { signed, loadingAuth } = useContext(AuthContext)

  if (loadingAuth) {
    return <div></div>
  }

  if (!signed) return <Navigate to="/login" />

  return children
}
