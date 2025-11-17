import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { useCars } from "../hooks/useCars"
import { useState } from "react"

export function FeaturedCars() {
  const { cars, loading, error } = useCars()
  const [displayCount, setDisplayCount] = useState(3)
  
  const displayedCars = cars.slice(0, displayCount)
  const hasMore = displayCount < cars.length
  
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3)
  }

  if (loading) {
    return (
      <section id="inventory" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">Featured Vehicles</h3>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-500">Loading cars...</div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="inventory" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">Featured Vehicles</h3>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-500">Error loading cars: {error}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="inventory" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">Featured Vehicles</h3>
        </div>

        {displayedCars.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">No featured vehicles available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedCars.map((car) => (
            <Card
              key={car.id}
              className="group overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                  <Badge 
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      car.status === 'New Arrival' 
                        ? 'bg-cyan-500 text-white' 
                        : car.status === 'Featured' 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-cyan-500 text-white'
                    }`}
                  >
                    {car.status}
                  </Badge>
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white border border-gray-300 hover:bg-gray-50 shadow-sm">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-black break-words">{car.name}</h4>
                    <p className="text-sm text-gray-500">{car.year}</p>
                  </div>
                  <p className="text-xl font-bold text-black">${car.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <span>{car.mileage}</span>
                  <span>•</span>
                  <span>{car.transmission}</span>
                  <span>•</span>
                  <span>{car.fuel}</span>
                </div>
                <Link to={`/cars/${car.id}`}>
                  <Button className="w-full bg-transparent border border-gray-300 text-black hover:bg-gray-50 rounded-md cursor-pointer">
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
              ))}
            </div>
            
            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <Button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-black text-white hover:bg-gray-800 rounded-lg transition-all duration-300 font-semibold"
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
