import Container from "../../components/container"
import { FiSearch } from "react-icons/fi"
import { useState, useEffect } from "react"
import { collection, query, getDocs, orderBy } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

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

  return (
    <Container>
      <div className="font-poppins">
        <section className="bg-white p-5 w-full max-w-3xl mx-auto flex items-center justify-center gap-2 rounded-lg">
          <input
            type="text"
            placeholder="Type Car Name"
            className="w-full border-2 rounded-lg h-9 px-3 outline-none font-medium"
          />
          <button className="text-black hover:scale-125 duration-300">
            <FiSearch size={28} />
          </button>
        </section>

        <h1 className="text-white text-center mt-6 text-3xl mb-4 font-montserrat italic">
          Not just a car, but your{" "}
          <span className="border-b-2 border-white pb-1">passion</span>
        </h1>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 bg-white p-5 rounded-lg">
          {cars.map((car) => (
            <section key={car.id} className="text-black w-full rounded-lg">
              <img
                className="w-full max-h-[320px] rounded-lg hover:scale-105 duration-300"
                src={car.images[1].url}
                alt="car"
              />
              <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>

              <div className="flex flex-col px-2">
                <span className="text-zinc-900 text-base mb-6">
                  Year: {car.year} | {car.km}
                </span>
                <strong className="text-xl">$ {car.price}</strong>
              </div>

              <div className="w-full h-px bg-black my-2"></div>

              <div className="px-2 pb-2">
                <span className="text-zinc-900">{car.city}</span>
              </div>
            </section>
          ))}
        </main>
      </div>
    </Container>
  )
}
