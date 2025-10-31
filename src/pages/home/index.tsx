import Container from "../../components/container"
import { FiSearch, FiMapPin, FiCalendar, FiActivity } from "react-icons/fi"
import { useState, useEffect } from "react"
import { collection, query, getDocs, orderBy } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"
import { Link } from "react-router-dom"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

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

export function Home() {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loadImages, setLoadImages] = useState<string[]>([])
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    function loadCars() {
      const carsRef = collection(db, "cars")

      const queryRef = query(carsRef, orderBy("created", "desc"))

      getDocs(queryRef).then((snapshot) => {
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
      })
    }

    loadCars()
  }, [])

  function handleImageLoad(id: string) {
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id])
  }

  return (
    <Container>
      <div className="font-poppins">
        {/* Hero Section */}
        <section className="text-center py-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            Find Your Dream{" "}
            <span className="text-gradient">Car</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover premium vehicles from trusted sellers. Your perfect car is just a search away.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative glass-effect p-2 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                      type="text"
                      placeholder="Search for your dream car..."
                      className="input-field pl-12 pr-4 py-4 text-lg"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <button className="btn-primary px-8 py-4 text-lg">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-slide-in-left">
          <div className="text-center glass-effect p-8 rounded-2xl">
            <div className="text-4xl font-bold text-gradient mb-2">{cars.length}+</div>
            <div className="text-muted-foreground">Premium Cars</div>
          </div>
          <div className="text-center glass-effect p-8 rounded-2xl">
            <div className="text-4xl font-bold text-gradient mb-2">100%</div>
            <div className="text-muted-foreground">Verified Sellers</div>
          </div>
          <div className="text-center glass-effect p-8 rounded-2xl">
            <div className="text-4xl font-bold text-gradient mb-2">24/7</div>
            <div className="text-muted-foreground">Customer Support</div>
          </div>
        </section>

        {/* Cars Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars
            .filter((car) => {
              return search.toLowerCase() === ""
                ? car
                : car.name.toLowerCase().includes(search)
            })
            .map((car, index) => (
              <Link to={`/car/${car.id}`} key={car.id} className="group">
                <div className="card card-hover p-0 overflow-hidden animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <div
                      className="w-full h-64 bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center"
                      style={{
                        display: loadImages.includes(car.id) ? "none" : "flex",
                      }}
                    >
                      <AiOutlineLoading3Quarters size={32} className="text-primary animate-spin" />
                    </div>
                    <img
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      src={car.images[0].url}
                      alt={car.name}
                      onLoad={() => handleImageLoad(car.id)}
                      style={{
                        display: loadImages.includes(car.id) ? "block" : "none",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {car.name}
                    </h3>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FiCalendar size={16} />
                        <span className="text-sm">{car.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FiActivity size={16} />
                        <span className="text-sm">{car.km} km</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FiMapPin size={16} />
                        <span className="text-sm">{car.city}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gradient">
                        ${car.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        View Details →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </main>

        {/* Empty State */}
        {cars.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-2xl font-bold text-foreground mb-4">No cars found</h3>
            <p className="text-muted-foreground mb-8">Be the first to list a car on our platform!</p>
          </div>
        )}
      </div>
    </Container>
  )
}
