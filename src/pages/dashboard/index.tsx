import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore"
import Container from "../../components/container"
import { DashboardHeader } from "../../components/panelHeader"
import { FiTrash2, FiPlus, FiCalendar, FiMapPin, FiEye, FiDollarSign, FiSearch, FiTrendingUp } from "react-icons/fi"
import { FaEdit, FaCar, FaStar } from "react-icons/fa"
import { useEffect, useState } from "react"
import { db, storage } from "../../services/firebaseConnection"
import { useAuth } from "../../contexts/AuthContext"
import { deleteObject, ref } from "firebase/storage"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

interface CarProps {
  id: string
  name: string
  year: string
  km: string
  uid: string
  price: string | number
  city: string
  images: CarImageProps[]
}

interface CarImageProps {
  name: string
  uid: string
  url: string
}
export function Dashboard() {
  const [cars, setCars] = useState<CarProps[]>([])
  const [filteredCars, setFilteredCars] = useState<CarProps[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()

  useEffect(() => {
    async function loadCars() {
      if (!currentUser?.uid) {
        setLoading(false)
        return
      }
      
      setLoading(true)
      try {
      const carsRef = collection(db, "cars")
        const queryRef = query(carsRef, where("uid", "==", currentUser.uid))
        const snapshot = await getDocs(queryRef)

        let listCars = [] as CarProps[]
        snapshot.forEach((doc) => {
          listCars.push({
            id: doc.id,
            city: doc.data().city,
            images: doc.data().images,
            name: doc.data().name,
            km: doc.data().km,
            price: doc.data().price,
            uid: doc.data().uid,
            year: doc.data().year,
          })
        })
        setCars(listCars)
        setFilteredCars(listCars)
      } catch (error) {
        console.error("Error loading cars:", error)
        toast.error("Failed to load cars")
      } finally {
        setLoading(false)
      }
    }

    loadCars()
  }, [currentUser])

  // Filter and search functionality
  useEffect(() => {
    let filtered = cars

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.year.toString().includes(searchQuery)
      )
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.year).getTime() - new Date(a.year).getTime()
        case "oldest":
          return new Date(a.year).getTime() - new Date(b.year).getTime()
        case "price-high":
          return Number(b.price) - Number(a.price)
        case "price-low":
          return Number(a.price) - Number(b.price)
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredCars(filtered)
  }, [cars, searchQuery, sortBy])

  async function handleDeleteCar(car: CarProps) {
    const itemCar = car

    try {
      const carRef = doc(db, "cars", itemCar.id)
      await deleteDoc(carRef)

      itemCar.images.map(async (image) => {
        const imagePath = `images/${image.uid}/${image.name}`

        const imageRef = ref(storage, imagePath)

        await deleteObject(imageRef)
        setCars(cars.filter((car) => car.id !== itemCar.id))
        toast.success("Successfully deleted car")
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
  return (
    <Container>
      <DashboardHeader />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">Loading your dashboard...</h2>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container >
      {/* Welcome Section - Black & White */}
      <div className="mb-8 animate-fade-in-up mt-2">
        <div className="bg-black text-white rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-gray-300 text-lg">Manage your car collection and track your listings</p>
          </div>
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/3 rounded-full"></div>
        </div>
      </div>
      
      {/* Dynamic Dashboard Stats - Black & White Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-fade-in-up">
        {/* Primary Stats - Large Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cars Count - Horizontal Layout */}
          <div className="bg-black text-white rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/3 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <FaCar className="text-white text-3xl" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{cars.length}</div>
                  <div className="text-gray-300 text-sm">Active Listings</div>
                </div>
              </div>
              <div className="text-gray-300 font-medium">Cars in your collection</div>
              {cars.length > 0 && (
                <div className="mt-3 text-sm text-gray-400">
                  +{Math.floor(cars.length * 0.1)} views this week
                </div>
              )}
            </div>
          </div>

          {/* Total Value - Vertical Layout */}
          <div className="bg-white border-2 border-black rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FiDollarSign className="text-white text-3xl" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-black">
            ${cars.reduce((sum, car) => sum + Number(car.price), 0).toLocaleString()}
                  </div>
                  <div className="text-gray-600 text-xs">Total Portfolio</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-gray-700 text-sm font-medium">Portfolio Value</div>
                {cars.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                    <span>+12% from last month</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Stats - Compact Cards */}
        <div className="lg:col-span-4 space-y-4">

        </div>
      </div>

      {/* Search and Filter Bar */}
      {cars.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 animate-slide-in-left">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search your cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="name">Name A-Z</option>
              </select>
              <Link to="/dashboard/new" className="btn-primary px-6 py-3 inline-flex items-center gap-2">
                <FiPlus size={18} />
                Add Car
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Add New Car Button - Only show when no cars */}
      {cars.length === 0 && (
      <div className="mb-8 animate-slide-in-left">
        <Link to="/dashboard/new" className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4">
          <FiPlus size={20} />
            <span>Add Your First Car</span>
        </Link>
      </div>
      )}

      {/* Enhanced Empty State */}
      {cars.length === 0 && !loading && (
        <div className="text-center py-20 animate-fade-in-up">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto">
              <FaCar className="text-blue-500 text-5xl" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <FiPlus className="text-white text-sm" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Start Your Journey</h2>
          <p className="text-gray-600 mb-8 text-lg max-w-lg mx-auto leading-relaxed">
            Build your dream car collection and start selling to car enthusiasts worldwide. 
            Your first listing is just a click away!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard/new" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3">
              <FiPlus size={20} />
            Add Your First Car
          </Link>
            <Link to="/" className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 text-lg px-8 py-4 inline-flex items-center gap-3 rounded-xl transition-all duration-200">
              <FiEye size={20} />
              Browse Marketplace
            </Link>
          </div>
        </div>
      )}

      {/* Varied Cars Grid - Different Layouts */}
      <main className="space-y-8">
        {filteredCars.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {filteredCars.map((car, index) => {
              // Alternate between different card layouts
              const isLargeCard = index === 0 || index % 4 === 0
              const isHorizontalCard = index % 3 === 1
              
              if (isLargeCard) {
                // Large Featured Card
                return (
                  <div key={car.id} className="lg:col-span-8 bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex flex-col md:flex-row">
                      {/* Large Image */}
                      <div className="md:w-1/2 relative overflow-hidden">
                        <img
                          className="w-full h-80 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={car.images[0]?.url || '/placeholder.svg'}
                  alt={car.name}
                />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Status Badge */}
                        <div className="absolute top-5 left-5 z-10">
                          <span className="bg-black/95 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase shadow-lg">
                            Featured
                          </span>
                        </div>
                
                {/* Action Buttons */}
                        <div className="absolute top-5 right-5 flex gap-2 z-10">
                  <Link to={`/dashboard/edit/${car.id}`}>
                            <button className="bg-white/95 backdrop-blur-md text-gray-800 p-3 rounded-xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl border border-gray-200/50">
                      <FaEdit size={16} />
                    </button>
                  </Link>
                  <button
                            className="bg-black/95 backdrop-blur-md text-white p-3 rounded-xl hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-xl"
                    onClick={() => handleDeleteCar(car)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Content */}
                      <div className="md:w-1/2 p-6 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-black transition-colors duration-300 mb-6 leading-tight break-words">
                            {car.name || 'Unnamed Vehicle'}
                          </h3>

                          <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3 text-gray-700">
                              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors duration-300">
                                <FiCalendar className="text-gray-700" size={16} />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-900">{car.year}</div>
                                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Model Year</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 text-gray-700">
                              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors duration-300">
                                <FiTrendingUp className="text-gray-700" size={16} />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-900">{Number(car.km).toLocaleString()}</div>
                                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Kilometers</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 text-gray-700">
                              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors duration-300">
                                <FiMapPin className="text-gray-700" size={16} />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-900">{car.city || 'Location not specified'}</div>
                                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Location</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 mt-auto">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-3xl md:text-4xl font-bold text-black mb-1 tracking-tight">${Number(car.price).toLocaleString()}</div>
                              <div className="text-sm text-gray-500">Starting price</div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg">
                                Negotiable
                              </div>
                            </div>
                          </div>
                          <Link 
                            to={`/cars/${car.id}`}
                            className="w-full bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          >
                            <FiEye size={16} />
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              } else if (isHorizontalCard) {
                // Horizontal Card
                return (
                  <div key={car.id} className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex">
                      <div className="w-1/3 relative overflow-hidden">
                        <img
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          src={car.images[0]?.url || '/placeholder.svg'}
                          alt={car.name}
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-black text-white px-2 py-1 rounded-full text-xs font-medium">
                            Active
                          </span>
                        </div>
                      </div>
                      <div className="w-2/3 p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-black transition-colors duration-300 break-words">{car.name}</h3>
                          <div className="text-sm text-gray-600 mt-1">{car.year} • {car.km.toLocaleString()} km</div>
                          <div className="text-xs text-gray-500 mt-1">{car.city}</div>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-lg font-bold text-black">${Number(car.price).toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Negotiable</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Link 
                              to={`/cars/${car.id}`}
                              className="text-black hover:text-gray-700 text-xs font-medium transition-colors duration-200 flex items-center gap-1"
                            >
                              <FiEye size={12} />
                              View
                            </Link>
                            <div className="flex gap-1">
                              <Link to={`/dashboard/edit/${car.id}`}>
                                <button className="text-gray-400 hover:text-black p-1 transition-colors duration-200">
                                  <FaEdit size={14} />
                                </button>
                              </Link>
                              <button
                                className="text-gray-400 hover:text-black p-1 transition-colors duration-200"
                                onClick={() => handleDeleteCar(car)}
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              } else {
                // Standard Card
                return (
                  <div key={car.id} className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="relative overflow-hidden">
                      <img
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        src={car.images[0]?.url || '/placeholder.svg'}
                        alt={car.name}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                          Active
                        </span>
                      </div>
                      
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Link to={`/dashboard/edit/${car.id}`}>
                          <button className="bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg">
                            <FaEdit size={14} />
                          </button>
                        </Link>
                        <button
                          className="bg-black/90 backdrop-blur-sm text-white p-2 rounded-full hover:bg-gray-800 hover:scale-110 transition-all duration-300 shadow-lg"
                          onClick={() => handleDeleteCar(car)}
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-gray-900 group-hover:text-black transition-colors duration-300 break-words flex-1 mr-2">{car.name}</h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <FaStar size={12} />
                          <span className="text-xs text-gray-500">4.8</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiCalendar className="text-black" size={12} />
                          <span className="text-xs font-medium">{car.year}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiTrendingUp className="text-black" size={12} />
                          <span className="text-xs font-medium">{car.km.toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiMapPin className="text-black" size={12} />
                          <span className="text-xs font-medium">{car.city}</span>
                  </div>
                </div>

                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-lg font-bold text-black">${Number(car.price).toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Negotiable</div>
                        </div>
                <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">Starting price</div>
                  <Link 
                            to={`/cars/${car.id}`}
                            className="text-black hover:text-gray-700 text-xs font-medium transition-colors duration-200 flex items-center gap-1"
                  >
                            <FiEye size={12} />
                            View
                  </Link>
                        </div>
                </div>
              </div>
            </div>
                )
              }
            })}
          </div>
        )}
      </main>

      {/* No Results State */}
      {cars.length > 0 && filteredCars.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiSearch className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => setSearchQuery("")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear search
          </button>
        </div>
      )}
    </Container>
  )
}
