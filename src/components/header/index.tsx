import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import { FaUserCircle } from "react-icons/fa"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export function Header() {
  const { loadingAuth, signed } = useContext(AuthContext)

  return (
    <>
      <div className="flex items-center justify-center px-4">
        <header className="w-full max-w-7xl h-32 flex items-center justify-between font-poppins">
          <Link to="/">
            <img className="h-32" src={logo} alt="" />
          </Link>
          {!loadingAuth && signed && (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="text-white flex items-center gap-2"
              >
                <FaUserCircle size={32} color="#fff" />
                Dashboard
              </Link>
            </div>
          )}

          {!loadingAuth && !signed && (
            <div className=" flex items-center gap-2">
              <Link
                to="/login"
                className="text-white border-2 px-7 py-2 rounded hover:bg-white hover:text-black duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border-2 px-7 py-2 rounded bg-white text-black hover:scale-105 duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </header>
      </div>
      <div className="border-2 "></div>
    </>
  )
}
