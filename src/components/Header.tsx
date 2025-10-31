import { Button } from "./ui/button"
import { Menu, Search, LogOut, X, Car, ChevronDown, User } from "lucide-react"
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

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
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isSearchOpen || isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen, isUserMenuOpen])

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchQuery("")
      setSearchResults([])
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-8">
            <button className="lg:hidden">
              <Menu className="h-6 w-6 text-foreground" />
            </button>
            <Link to="/" className="text-xl lg:text-2xl font-bold tracking-tight text-foreground">
              Web Cars
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/" className="text-foreground hover:text-muted-foreground transition-colors">Cars</Link>
              <Link to="/about" className="text-foreground hover:text-muted-foreground transition-colors">About</Link>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative" ref={searchRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full border border-transparent hover:border-border transition-all duration-200 hover:cursor-pointer"
                onClick={handleSearchToggle}
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {/* Search Modal */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-card border border-border rounded-xl shadow-lg z-50">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Search className="h-5 w-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search for cars..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 outline-none text-foreground placeholder-muted-foreground bg-transparent"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSearchToggle}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Search Results */}
                    <div className="max-h-80 overflow-y-auto">
                      {isSearching ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          <span className="ml-2 text-muted-foreground">Searching...</span>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="space-y-2">
                          {searchResults.map((car) => (
                            <Link
                              key={car.id}
                              to={`/cars/${car.id}`}
                              className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors"
                              onClick={handleSearchToggle}
                            >
                              <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                {car.images && car.images.length > 0 ? (
                                  <img
                                    src={car.images[0].url}
                                    alt={car.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Car className="h-6 w-6 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-foreground truncate">{car.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {car.year} • {car.city} • ${car.price.toLocaleString()}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : searchQuery ? (
                        <div className="text-center py-8">
                          <Car className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">No cars found for "{searchQuery}"</p>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">Start typing to search for cars</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-foreground font-medium">
                    {currentUser.displayName || currentUser.email}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg z-50">
                    <div className="p-2">
                      {/* User Info */}
                      <div className="px-3 py-2 border-b border-border">
                        <p className="text-sm font-medium text-foreground">
                          {currentUser.displayName || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {currentUser.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Car className="h-4 w-4" />
                          Dashboard
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-border pt-1">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false)
                            handleLogout()
                          }}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors duration-200 w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg border border-transparent hover:border-border transition-all duration-200 font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-semibold text-sm"
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
