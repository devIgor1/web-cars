import { Button } from "./ui/button"
import { Menu, Search, LogOut, User, X, Car } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useState, useEffect, useRef } from "react"
import { collection, getDocs, query as firestoreQuery, orderBy, limit } from "firebase/firestore"
import { db } from "../services/firebaseConnection"

interface SearchResult {
  id: string
  name: string
  price: number
  year: number
  city: string
  images: Array<{ url: string }>
}

export function Header() {
  const { currentUser, logout } = useAuth()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Failed to log out:", error)
    }
  }

  const searchCars = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      // Fetch all cars and filter client-side for better search results
      const carsRef = collection(db, "cars")
      const q = firestoreQuery(carsRef, orderBy('created', 'desc'), limit(50))
      
      const snapshot = await getDocs(q)
      const allResults = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          name: data.name || '',
          price: data.price || 0,
          year: data.year || 0,
          city: data.city || '',
          images: data.images || []
        }
      }) as SearchResult[]
      
      // Filter results client-side for better case-insensitive matching
      const searchTerm = query.toLowerCase().trim()
      
      const filteredResults = allResults.filter(car => 
        car.name.toLowerCase().includes(searchTerm) ||
        car.city.toLowerCase().includes(searchTerm) ||
        car.year.toString().includes(searchTerm) ||
        (car.name.toLowerCase().split(' ').some(word => word.startsWith(searchTerm)))
      ).slice(0, 5)
      
      setSearchResults(filteredResults)
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchCars(searchQuery)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Close search modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
        setSearchQuery("")
        setSearchResults([])
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen])

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchQuery("")
      setSearchResults([])
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
            <div className="relative" ref={searchRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-700 hover:text-black hover:bg-gray-100 rounded-full border border-transparent hover:border-gray-200 transition-all duration-200 hover:cursor-pointer"
                onClick={handleSearchToggle}
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {/* Search Modal */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Search className="h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search for cars..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 outline-none text-gray-900 placeholder-gray-500"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSearchToggle}
                        className="h-8 w-8 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Search Results */}
                    <div className="max-h-80 overflow-y-auto">
                      {isSearching ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                          <span className="ml-2 text-gray-600">Searching...</span>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="space-y-2">
                          {searchResults.map((car) => (
                            <Link
                              key={car.id}
                              to={`/cars/${car.id}`}
                              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                              onClick={handleSearchToggle}
                            >
                              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {car.images && car.images.length > 0 ? (
                                  <img
                                    src={car.images[0].url}
                                    alt={car.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Car className="h-6 w-6 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">{car.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {car.year} • {car.city} • ${car.price.toLocaleString()}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : searchQuery ? (
                        <div className="text-center py-8">
                          <Car className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No cars found for "{searchQuery}"</p>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Search className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">Start typing to search for cars</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
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
