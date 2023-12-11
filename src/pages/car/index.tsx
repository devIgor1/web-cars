import { doc, getDoc } from "firebase/firestore"
import Container from "../../components/container"
import { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { db } from "../../services/firebaseConnection"

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

  useEffect(() => {
    async function loadCar() {
      if (!id) {
        return
      }

      const docRef = doc(db, "cars", id)

      getDoc(docRef).then((snapshot) => {
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

  return (
    <Container>
      <h1>Slider</h1>

      {car && (
        <main className="w-full bg-white rounded-lg p-6 my-4 font-poppins">
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
    </Container>
  )
}
