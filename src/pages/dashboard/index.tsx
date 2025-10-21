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
import { FiTrash2, FiPlus, FiCalendar, FiActivity, FiMapPin } from "react-icons/fi"
import { FaEdit, FaCar } from "react-icons/fa"
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
  const { currentUser } = useAuth()

  useEffect(() => {
    function loadCars() {
      if (!currentUser?.uid) {
        return
      }
      const carsRef = collection(db, "cars")

      const queryRef = query(carsRef, where("uid", "==", currentUser.uid))

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
  }, [currentUser])

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
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in-up">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FaCar className="text-blue-600 text-xl" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{cars.length}</div>
          <div className="text-gray-600 font-medium">Total Cars Listed</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FiActivity className="text-green-600 text-xl" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            ${cars.reduce((sum, car) => sum + Number(car.price), 0).toLocaleString()}
          </div>
          <div className="text-gray-600 font-medium">Total Value</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FiCalendar className="text-purple-600 text-xl" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
          <div className="text-gray-600 font-medium">Messages</div>
        </div>
      </div>

      {/* Add New Car Button */}
      <div className="mb-8 animate-slide-in-left">
        <Link to="/dashboard/new" className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4">
          <FiPlus size={20} />
          <span>Add New Car</span>
        </Link>
      </div>

      {/* Empty State */}
      {cars.length === 0 && (
        <div className="text-center py-20 animate-fade-in-up">
          <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <FaCar className="text-gray-400 text-4xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No cars found</h2>
          <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
            Start building your car collection by adding your first vehicle to the marketplace.
          </p>
          <Link to="/dashboard/new" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3">
            <FiPlus size={20} />
            Add Your First Car
          </Link>
        </div>
      )}

      {/* Cars Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cars.length > 0 &&
          cars.map((car, index) => (
            <div key={car.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up group" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  src={car.images[0].url}
                  alt={car.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link to={`/dashboard/edit/${car.id}`}>
                    <button className="bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full hover:bg-white transition-colors duration-300 shadow-sm">
                      <FaEdit size={16} />
                    </button>
                  </Link>
                  <button
                    className="bg-red-500/90 backdrop-blur-sm text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300 shadow-sm"
                    onClick={() => handleDeleteCar(car)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{car.name}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FiCalendar className="text-gray-500" size={14} />
                    </div>
                    <span className="text-sm font-medium">{car.year}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FiActivity className="text-gray-500" size={14} />
                    </div>
                    <span className="text-sm font-medium">{car.km.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FiMapPin className="text-gray-500" size={14} />
                    </div>
                    <span className="text-sm font-medium">{car.city}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-2xl font-bold text-gray-900">${car.price.toLocaleString()}</div>
                  <Link 
                    to={`/cars/${car.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors duration-300"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </main>
    </Container>
  )
}
