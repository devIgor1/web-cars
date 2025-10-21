import { doc, getDoc } from "firebase/firestore"
import Container from "../../components/container"
import { useEffect, useState } from "react"
import { FaWhatsapp, FaArrowLeft, FaCalendar, FaMapPin, FaUser, FaPhone } from "react-icons/fa"
import { FiActivity } from "react-icons/fi"
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../services/firebaseConnection"
import { Swiper, SwiperSlide } from "swiper/react"
import { Link } from "react-router-dom"

interface CarProps {
  id: string
  name: string
  model: string
  city: string
  year: string
  km: string
  description: string
  created: string
  price: string | number
  owner: string
  uid: string
  images: CarImageProps[]
  phone: string
}

interface CarImageProps {
  uid: string
  name: string
  url: string
}

export function CarDetail() {
  const { id } = useParams()
  const [car, setCar] = useState<CarProps>()
  const [sliderPreview, setSliderPreview] = useState<number>(2)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadCar() {
      if (!id) {
        return
      }

      const docRef = doc(db, "cars", id)

      getDoc(docRef).then((snapshot) => {
        if (!snapshot.data()) {
          navigate("/")
        }

        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          year: snapshot.data()?.year,
          city: snapshot.data()?.city,
          model: snapshot.data()?.model,
          uid: snapshot.data()?.uid,
          description: snapshot.data()?.description,
          km: snapshot.data()?.km,
          created: snapshot.data()?.created,
          phone: snapshot.data()?.phone,
          price: snapshot.data()?.price,
          owner: snapshot.data()?.owner,
          images: snapshot.data()?.images,
        })
      })
    }
    loadCar()
  }, [id])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSliderPreview(1)
      } else {
        setSliderPreview(2)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Container>
      <div className="py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 mb-8 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to cars</span>
        </Link>

        {car && (
          <div className="card p-0 overflow-hidden animate-fade-in-up">
            {/* Image Gallery */}
            <div className="relative">
              <Swiper
                slidesPerView={sliderPreview}
                pagination={{ clickable: true }}
                navigation
                className="w-full"
              >
                {car?.images.map((image, index) => (
                  <SwiperSlide key={image.name}>
                    <div className="relative group">
                      <img
                        src={image.url}
                        className="w-full h-96 md:h-[500px] object-cover"
                        alt={`${car.name} - Image ${index + 1}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{car?.name}</h1>
                  <p className="text-xl text-white/70">{car.model}</p>
                </div>
                <div className="mt-4 lg:mt-0">
                  <div className="text-4xl font-bold text-gradient">${car?.price}</div>
                  <p className="text-white/60 text-sm">Asking Price</p>
                </div>
              </div>

              {/* Car Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-effect p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <FaCalendar className="text-primary-400" size={20} />
                    <span className="text-white/70 font-medium">Year</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{car?.year}</div>
                </div>

                <div className="glass-effect p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <FiActivity className="text-primary-400" size={20} />
                    <span className="text-white/70 font-medium">Mileage</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{car?.km} km</div>
                </div>

                <div className="glass-effect p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <FaMapPin className="text-primary-400" size={20} />
                    <span className="text-white/70 font-medium">Location</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{car?.city}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Description</h3>
                <div className="glass-effect p-6 rounded-xl">
                  <p className="text-white/80 leading-relaxed text-lg">{car?.description}</p>
                </div>
              </div>

              {/* Seller Information */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Seller Information</h3>
                <div className="glass-effect p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                      <FaUser className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-white">{car?.owner}</div>
                      <div className="text-white/60">Verified Seller</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-primary-400" size={18} />
                    <span className="text-white/80 text-lg">{car?.phone}</span>
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              <a
                href={`https://api.whatsapp.com/send?phone=${car?.phone}&text=Hello! I came across your ${car?.name} advertisement on the Web Cars website, and I'm quite interested. Could you provide more details or information about it, please?`}
                target="_blank"
                className="btn-secondary w-full py-4 text-lg font-semibold flex items-center justify-center gap-3 group"
              >
                <FaWhatsapp size={24} />
                <span>Contact Seller on WhatsApp</span>
                <div className="group-hover:translate-x-1 transition-transform duration-300">→</div>
              </a>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
