import { Button } from "./ui/button"
import { Menu, Search, LogOut, User } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export function Header() {
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Failed to log out:", error)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-8">
            <button className="lg:hidden">
              <Menu className="h-6 w-6 text-black" />
            </button>
            <Link to="/" className="text-xl lg:text-2xl font-bold tracking-tight text-black">
              Web Cars
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#inventory" className="text-black hover:text-gray-600 transition-colors">Inventory</a>
              <a href="/about" className="text-black hover:text-gray-600 transition-colors">About</a>
              <a href="#financing" className="text-black hover:text-gray-600 transition-colors">Financing</a>
              <a href="#contact" className="text-black hover:text-gray-600 transition-colors">Contact</a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link 
                  to="/login" 
                  className="text-black hover:text-gray-600 transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="text-black hover:text-gray-600 transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
