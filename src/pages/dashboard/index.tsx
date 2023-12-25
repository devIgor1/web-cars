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
import { FiTrash2 } from "react-icons/fi"
import { FaEdit } from "react-icons/fa"
import { useContext, useEffect, useState } from "react"
import { db, storage } from "../../services/firebaseConnection"
import { AuthContext } from "../../context/AuthContext"
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
  const { user } = useContext(AuthContext)

  useEffect(() => {
    function loadCars() {
      if (!user?.uid) {
        return
      }
      const carsRef = collection(db, "cars")

      const queryRef = query(carsRef, where("uid", "==", user.uid))

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
  }, [user])

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

  return (
    <Container>
      <DashboardHeader />
      {cars.length === 0 && (
        <div className="w-full flex items-center justify-center mt-6">
          <h1 className=" text-4xl text-white font-poppins text-center">
            No cars found,{" "}
            <Link to="/dashboard/new" className="underline text-yellow-500">
              register one
            </Link>{" "}
            to appear here!
          </h1>
        </div>
      )}
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-2 font-poppins">
        {cars.length > 0 &&
          cars.map((car) => (
            <section key={car.id} className="w-full bg-white p-5 rounded-lg">
              <img
                className="w-full rounded-lg mb-2 h-[290px]"
                src={car.images[0].url}
                alt="car image"
              />
              <p className="font-bold mt-1 px-2 mb-2 text-xl">{car.name}</p>

              <div className="flex flex-col px-2 relative">
                <span className="text-zinc-900 text-base mb-6">
                  Year: {car.year} | {car.km} km
                </span>

                <strong className="text-xl">$ {car.price}</strong>
                <button
                  className="text-red-500 absolute rounded-full right-2 top-12 hover:scale-110 duration-300"
                  onClick={() => handleDeleteCar(car)}
                >
                  <FiTrash2 size={26} />
                </button>
                <Link to={`/dashboard/edit/${car.id}`}>
                  <button className="text-zinc-900 absolute rounded-full right-10 top-12 hover:scale-110 duration-300">
                    <FaEdit size={26} />
                  </button>
                </Link>
              </div>

              <div className="w-full h-px bg-black my-2"></div>

              <div className="px-2 pb-2">
                <span className="text-zinc-900">{car.city}</span>
              </div>
            </section>
          ))}
      </main>
    </Container>
  )
}
