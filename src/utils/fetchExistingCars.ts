import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../services/firebaseConnection"

export interface ExistingCar {
  id: string
  city?: string
  created?: any
  description?: string
  images?: Array<{
    name: string
    uid: string
    url: string
  }>
  // Add other fields that might exist in your database
  name?: string
  year?: number
  price?: number
  mileage?: string
  transmission?: string
  fuel?: string
  status?: string
  brand?: string
  model?: string
  color?: string
  condition?: string
}

export async function fetchExistingCars(): Promise<ExistingCar[]> {
  try {
    console.log("Fetching existing cars from Firestore...")
    
    const carsCollection = collection(db, "cars")
    const carsQuery = query(carsCollection, orderBy("created", "desc"))
    const carsSnapshot = await getDocs(carsQuery)
    
    const cars = carsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ExistingCar[]
    
    console.log(`Found ${cars.length} cars in database:`)
    cars.forEach((car, index) => {
      console.log(`${index + 1}. ID: ${car.id}`)
      console.log(`   - City: ${car.city || 'N/A'}`)
      console.log(`   - Description: ${car.description || 'N/A'}`)
      console.log(`   - Images: ${car.images?.length || 0} images`)
      console.log(`   - Name: ${car.name || 'N/A'}`)
      console.log(`   - Brand: ${car.brand || 'N/A'}`)
      console.log(`   - Model: ${car.model || 'N/A'}`)
      console.log(`   - Year: ${car.year || 'N/A'}`)
      console.log(`   - Price: ${car.price || 'N/A'}`)
      console.log("---")
    })
    
    return cars
  } catch (error) {
    console.error("Error fetching existing cars:", error)
    throw error
  }
}

// Function to get a sample of cars for display
export function getSampleCars(cars: ExistingCar[], limit: number = 4): ExistingCar[] {
  return cars.slice(0, limit).map(car => ({
    ...car,
    // Map your existing fields to the expected format
    name: car.name || `${car.brand || 'Car'} ${car.model || ''}`.trim() || 'Unknown Car',
    year: car.year || new Date().getFullYear(),
    price: car.price || 0,
    image: car.images?.[0]?.url || '/placeholder.svg',
    mileage: car.mileage || 'N/A',
    transmission: car.transmission || 'Unknown',
    fuel: car.fuel || 'Unknown',
    status: car.status || 'Available'
  }))
}




