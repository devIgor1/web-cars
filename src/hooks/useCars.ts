import { useState, useEffect } from 'react'
import { collection, getDocs, doc, getDoc, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../services/firebaseConnection'

export interface Car {
  id: string
  name: string
  year: number
  price: number
  image: string
  mileage: string
  transmission?: string
  fuel?: string
  status?: string
  description?: string
  city?: string
  model?: string
  owner?: string
  phone?: string
  uid?: string
  km?: string
  images?: Array<{
    name: string
    uid: string
    url: string
  }>
  features?: string[]
  specifications?: {
    engine: string
    horsepower: string
    torque: string
    acceleration: string
    topSpeed: string
    transmission: string
    drivetrain: string
    fuelType: string
    fuelEconomy?: string
    range?: string
    charging?: string
  }
  // Direct fields for easier access
  engine?: string
  horsepower?: string
  torque?: string
  acceleration?: string
  topSpeed?: string
  drivetrain?: string
  fuelType?: string
  gallery?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export function useCars() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        const carsCollection = collection(db, 'cars')
        const carsQuery = query(carsCollection, orderBy('created', 'desc'))
        const carsSnapshot = await getDocs(carsQuery)
        
        const carsData = carsSnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            name: data.name || 'Unknown Car',
            year: data.year || new Date().getFullYear(),
            price: data.price || 0,
            image: data.images?.[0]?.url || '/placeholder.svg',
            mileage: data.km || 'N/A',
            transmission: data.transmission || 'Unknown',
            fuel: data.fuel || 'Unknown',
            status: data.status || 'Available',
            description: data.description || '',
            city: data.city || '',
            model: data.model || '',
            owner: data.owner || '',
            phone: data.phone || '',
            uid: data.uid || '',
            km: data.km || '',
            images: data.images || [],
            ...data
          } as Car
        })
        
        setCars(carsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching cars:', err)
        setError('Failed to fetch cars')
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  return { cars, loading, error }
}

export function useCar(id: string) {
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true)
        const carDoc = doc(db, 'cars', id)
        const carSnapshot = await getDoc(carDoc)
        
        if (carSnapshot.exists()) {
          const data = carSnapshot.data()
          setCar({
            id: carSnapshot.id,
            name: data.name || 'Unknown Car',
            year: data.year || new Date().getFullYear(),
            price: data.price || 0,
            image: data.images?.[0]?.url || '/placeholder.svg',
            mileage: data.km || 'N/A',
            transmission: data.transmission || 'Unknown',
            fuel: data.fuel || 'Unknown',
            status: data.status || 'Available',
            description: data.description || '',
            city: data.city || '',
            model: data.model || '',
            owner: data.owner || '',
            phone: data.phone || '',
            uid: data.uid || '',
            km: data.km || '',
            images: data.images || [],
            ...data
          } as Car)
        } else {
          setError('Car not found')
        }
      } catch (err) {
        console.error('Error fetching car:', err)
        setError('Failed to fetch car')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCar()
    }
  }, [id])

  return { car, loading, error }
}

export function useFeaturedCars(limitCount: number = 4) {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        setLoading(true)
        const carsCollection = collection(db, 'cars')
        const carsQuery = query(
          carsCollection, 
          orderBy('created', 'desc'),
          limit(limitCount)
        )
        const carsSnapshot = await getDocs(carsQuery)
        
        const carsData = carsSnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            name: data.name || 'Unknown Car',
            year: data.year || new Date().getFullYear(),
            price: data.price || 0,
            image: data.images?.[0]?.url || '/placeholder.svg',
            mileage: data.km || 'N/A',
            transmission: data.transmission || 'Unknown',
            fuel: data.fuel || 'Unknown',
            status: data.status || 'Available',
            description: data.description || '',
            city: data.city || '',
            model: data.model || '',
            owner: data.owner || '',
            phone: data.phone || '',
            uid: data.uid || '',
            km: data.km || '',
            images: data.images || [],
            ...data
          } as Car
        })
        
        setCars(carsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching featured cars:', err)
        setError('Failed to fetch featured cars')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedCars()
  }, [limitCount])

  return { cars, loading, error }
}
