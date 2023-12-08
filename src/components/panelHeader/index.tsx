import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"
import { CgLogOut } from "react-icons/cg"

export function DashboardHeader() {
  async function handleLogout() {
    await signOut(auth)
  }

  return (
    <div className="bg-white p-4 rounded-lg flex items-center justify-between font-poppins">
      <div>
        <Link to="/dashboard" className="mr-4">
          Dashboard
        </Link>
        <Link to="/dashboard/new" className="border-l-2 border-black pl-3">
          New
        </Link>
      </div>
      <button onClick={handleLogout}>
        <CgLogOut size={28} />
      </button>
    </div>
  )
}
