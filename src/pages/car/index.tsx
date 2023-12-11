import { doc, getDoc } from "firebase/firestore"
import Container from "../../components/container"
import { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../services/firebaseConnection"
import { Swiper, SwiperSlide } from "swiper/react"

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
      <div className="rounded- w-full bg-white rounded-lg p-6 my-4 font-poppins">
        {car && (
          <Swiper
            slidesPerView={sliderPreview}
            pagination={{ clickable: true }}
            navigation
          >
            {car?.images.map((image) => (
              <SwiperSlide key={image.name}>
                <img
                  src={image.url}
                  className="w-full h-96 object-cover mb-9 rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {car && (
          <main>
            <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
              <h1 className="font-bold text-3xl">{car?.name}</h1>
              <h1 className="font-bold text-3xl">${car?.price}</h1>
            </div>
            <p className="text-lg">{car.model}</p>

            <div className="flex w-full gap-6 my-4">
              <div className="flex flex-col gap-4">
                <div>
                  <p>City</p>
                  <strong>{car?.city}</strong>
                </div>
                <div>
                  <p>Year</p>
                  <strong>{car?.year}</strong>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p>Km</p>
                  <strong>{car?.km}</strong>
                </div>
              </div>
            </div>
            <strong>Description</strong>
            <p className="mb-4">{car?.description}</p>
            <strong>Phone</strong>
            <p className="mb-4">{car?.phone}</p>
            <a className="bg-green-500 w-full p-3 text-white flex items-center justify-center gap-2 my-6 h-14 text-center md:h-11 text-base md:text-xl rounded-lg cursor-pointer font-bold hover:bg-green-400 duration-300">
              Interested? Reach out to the seller for details and purchase
              options.
              <span>
                <FaWhatsapp size={26} />
              </span>
            </a>
          </main>
        )}
      </div>
    </Container>
  )
}
