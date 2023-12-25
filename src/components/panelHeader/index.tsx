import { Link, useLocation } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"
import { CgLogOut } from "react-icons/cg"
import Container from "../container"

export function DashboardHeader() {
  async function handleLogout() {
    await signOut(auth)
  }

  const location = useLocation()

  const isActive = (pathname: string) => {
    return location.pathname === pathname ? "underline" : ""
  }

  return (
    <div className="bg-white p-4 rounded-lg flex items-center justify-between font-poppins">
      <div>
        <Link to="/dashboard" className={`${isActive("/dashboard")}`}>
          Dashboard
        </Link>
        <Link
          to="/dashboard/new"
          className={`pl-3 ${isActive("/dashboard/new")}`}
        >
          New
        </Link>
      </div>
      <button onClick={handleLogout}>
        <CgLogOut size={28} />
      </button>
    </div>
  )
}
