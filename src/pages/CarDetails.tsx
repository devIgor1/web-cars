import { Header } from "../components/Header"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ChevronLeft, Heart, Share2, Gauge, Fuel, Settings, MapPin, Zap } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { CarContactCard } from "../components/CarContactCard"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useCar } from "../hooks/useCars"
import { useState } from "react"

export function CarDetails() {
  const { id } = useParams()
  const { car, loading, error } = useCar(id || "")
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    // Here you can add logic to save to favorites in your backend
    console.log('Car favorited:', car?.name)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: car?.name || 'Car Listing',
          text: `Check out this ${car?.name} on WebCars`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading car details...</h1>
        </div>
      </div>
    )
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Car not found</h1>
          <p className="text-muted-foreground mb-4">{error || "The car you're looking for doesn't exist."}</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <Link to="/">
            <Button variant="ghost" className="gap-2 cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Image Carousel */}
        <div className="container mx-auto px-4 lg:px-8 mb-12">
          <div className="relative max-w-4xl mx-auto">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className="rounded-lg overflow-hidden"
            >
              {/* Main car image */}
              <SwiperSlide>
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img 
                    src={car.image || "/placeholder.svg"} 
                    alt={car.name} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className={`h-8 w-8 rounded-full bg-white/90 hover:bg-white transition-colors ${
                        isFavorited ? 'text-red-500' : 'text-gray-600'
                      }`}
                      onClick={handleFavorite}
                    >
                      <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="h-8 w-8 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-black transition-colors"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
              
              {/* Additional car images */}
              {car.images && car.images.length > 0 ? (
                car.images.map((img: any, idx: number) => (
                  <SwiperSlide key={idx}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={img.url || img || "/placeholder.svg"}
                        alt={`${car.name} view ${idx + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))
              ) : null}
            </Swiper>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge 
                    className={`text-sm font-semibold px-4 py-2 rounded-full shadow-md ${
                      car.status === 'New Arrival' 
                        ? 'bg-green-500 text-white' 
                        : car.status === 'Featured' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-orange-500 text-white'
                    }`}
                  >
                    {car.status}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="text-sm font-semibold px-4 py-2 rounded-full border-2 border-muted-foreground/30 text-muted-foreground bg-background/80"
                  >
                    {car.year}
                  </Badge>
                </div>
                <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 text-balance break-words">{car.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{car.city || 'Location not specified'}</span>
                </div>
              </div>

              {/* Key Specs */}
              <Card className="p-6">
                <h3 className="font-serif text-xl font-bold mb-6">Key Specifications</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Gauge className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mileage</p>
                      <p className="font-semibold">{car.mileage}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Settings className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Transmission</p>
                      <p className="font-semibold">{car.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Fuel className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fuel Type</p>
                      <p className="font-semibold">{car.fuel}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Zap className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Description */}
              <Card className="p-6">
                <h3 className="font-serif text-xl font-bold mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{car.description}</p>
              </Card>

              {/* Performance */}
              <Card className="p-6">
                <h3 className="font-serif text-xl font-bold mb-6">Performance & Engine</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Engine</span>
                    <span className="font-semibold">{car.specifications?.engine || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Horsepower</span>
                    <span className="font-semibold">{car.specifications?.horsepower || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Torque</span>
                    <span className="font-semibold">{car.specifications?.torque || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">0-60 mph</span>
                    <span className="font-semibold">{car.specifications?.acceleration || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Top Speed</span>
                    <span className="font-semibold">{car.specifications?.topSpeed || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Drivetrain</span>
                    <span className="font-semibold">{car.specifications?.drivetrain || car.drivetrain || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Transmission</span>
                    <span className="font-semibold">{car.specifications?.transmission || car.transmission || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Fuel Type</span>
                    <span className="font-semibold">{car.specifications?.fuelType || car.fuelType || car.fuel || 'Not specified'}</span>
                  </div>
                </div>
              </Card>

              {/* Features */}
              {car.features && car.features.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-6">Features & Options</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {car.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Vehicle Details */}
              <Card className="p-6">
                <h3 className="font-serif text-xl font-bold mb-6">Vehicle Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Model</span>
                    <span className="font-semibold">{car.model || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Year</span>
                    <span className="font-semibold">{car.year}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Mileage</span>
                    <span className="font-semibold">{car.mileage}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Transmission</span>
                    <span className="font-semibold">{car.transmission}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Fuel Type</span>
                    <span className="font-semibold">{car.fuel}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-semibold">{car.city || 'Not specified'}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Contact Card */}
            <div className="lg:col-span-1">
              <CarContactCard
                price={(() => {
                  // Handle price formatting - convert to number and format with commas
                  let priceValue: number
                  if (typeof car.price === 'string') {
                    // Remove all formatting (periods, commas, spaces) and convert to number
                    const cleanedPrice = car.price.replace(/[.,\s]/g, '')
                    priceValue = parseFloat(cleanedPrice) || 0
                  } else {
                    priceValue = Number(car.price) || 0
                  }
                  return `$${priceValue.toLocaleString('en-US')}`
                })()}
                carName={car.name}
                carYear={car.year}
                stockNumber={car.id}
                whatsappNumber={car.phone || "+1234567890"}
              />
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
