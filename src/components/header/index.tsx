import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import { FaUserCircle, FaCar, FaHome, FaInfoCircle, FaQuestionCircle } from "react-icons/fa"
import { useAuth } from "../../contexts/AuthContext"

export function Header() {
  const { loading, currentUser } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-7xl h-20 flex items-center justify-between font-poppins">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img className="h-12 w-auto group-hover:scale-110 transition-transform duration-300" src={logo} alt="WebCars" />
              <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-gradient">WebCars</h1>
              <p className="text-xs text-white/60 -mt-1">Premium Car Marketplace</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group"
            >
              <FaHome className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Home</span>
            </Link>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group"
            >
              <FaCar className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Cars</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group"
            >
              <FaInfoCircle className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">About</span>
            </Link>
            <Link 
              to="/faq" 
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group"
            >
              <FaQuestionCircle className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">FAQ</span>
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {!loading && currentUser && (
              <Link
                to="/dashboard"
                className="btn-primary flex items-center gap-2 text-sm"
              >
                <FaUserCircle size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {!loading && !currentUser && (
              <>
                <Link
                  to="/login"
                  className="btn-outline text-sm px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm px-4 py-2"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
