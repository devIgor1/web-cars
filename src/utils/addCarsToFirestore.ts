import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "../services/firebaseConnection"

// Car data from your FeaturedCars component
const carsData = [
  {
    name: "Porsche 911 Turbo S",
    year: 2024,
    price: 230000,
    image: "/porsche-911-turbo-s-silver.jpg",
    mileage: "2,500 mi",
    transmission: "Automatic",
    fuel: "Gasoline",
    status: "New Arrival",
    description: "The Porsche 911 Turbo S combines breathtaking performance with everyday usability. With its 3.8-liter twin-turbo flat-six engine producing 640 horsepower, this iconic sports car delivers 0-60 mph in just 2.6 seconds.",
    features: [
      "640 HP Twin-Turbo Engine",
      "0-60 mph in 2.6 seconds",
      "All-Wheel Drive",
      "Sport Chrono Package",
      "Carbon Ceramic Brakes",
      "Adaptive Suspension"
    ],
    specifications: {
      engine: "3.8L Twin-Turbo Flat-6",
      horsepower: 640,
      torque: "590 lb-ft",
      acceleration: "2.6s 0-60 mph",
      topSpeed: "205 mph",
      transmission: "8-Speed PDK",
      drivetrain: "All-Wheel Drive",
      fuelEconomy: "15/20 mpg city/highway"
    },
    gallery: [
      "/porsche-911-turbo-s-silver.jpg",
      "/porsche-911-interior.jpg",
      "/porsche-911-engine.jpg",
      "/porsche-911-rear-view.jpg"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Mercedes-AMG GT",
    year: 2024,
    price: 165000,
    image: "/mercedes-amg-gt-black.jpg",
    mileage: "1,200 mi",
    transmission: "Automatic",
    fuel: "Gasoline",
    status: "Featured",
    description: "The Mercedes-AMG GT represents the pinnacle of AMG performance. With its handcrafted 4.0-liter V8 biturbo engine and rear-wheel drive, it delivers an exhilarating driving experience with unmatched luxury.",
    features: [
      "Handcrafted AMG V8 Engine",
      "AMG Performance Exhaust",
      "AMG Track Package",
      "Carbon Fiber Interior",
      "AMG Dynamic Select",
      "AMG Ceramic Brakes"
    ],
    specifications: {
      engine: "4.0L V8 Biturbo",
      horsepower: 469,
      torque: "465 lb-ft",
      acceleration: "3.7s 0-60 mph",
      topSpeed: "189 mph",
      transmission: "7-Speed AMG SPEEDSHIFT",
      drivetrain: "Rear-Wheel Drive",
      fuelEconomy: "16/22 mpg city/highway"
    },
    gallery: [
      "/mercedes-amg-gt-black.jpg",
      "/mercedes-amg-gt-interior.jpg",
      "/mercedes-amg-gt-engine.jpg",
      "/mercedes-amg-gt-side.jpg"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "BMW M4 Competition",
    year: 2024,
    price: 95000,
    image: "/bmw-m4-competition-blue.png",
    mileage: "3,800 mi",
    transmission: "Automatic",
    fuel: "Gasoline",
    status: "Hot Deal",
    description: "The BMW M4 Competition combines high-performance engineering with everyday practicality. Its 3.0-liter inline-six engine with M TwinPower Turbo technology delivers exceptional power and efficiency.",
    features: [
      "M TwinPower Turbo Engine",
      "M xDrive All-Wheel Drive",
      "M Carbon Bucket Seats",
      "M Carbon Exterior Package",
      "M Professional Suspension",
      "M Carbon Ceramic Brakes"
    ],
    specifications: {
      engine: "3.0L Inline-6 TwinPower Turbo",
      horsepower: 503,
      torque: "479 lb-ft",
      acceleration: "3.4s 0-60 mph",
      topSpeed: "180 mph",
      transmission: "8-Speed M Steptronic",
      drivetrain: "M xDrive All-Wheel Drive",
      fuelEconomy: "16/23 mpg city/highway"
    },
    gallery: [
      "/bmw-m4-competition-blue.png",
      "/bmw-m4-interior.jpg",
      "/bmw-m4-engine.jpg",
      "/bmw-m4-side.jpg"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Audi RS e-tron GT",
    year: 2024,
    price: 145000,
    image: "/audi-rs-etron-gt-white.jpg",
    mileage: "1,500 mi",
    transmission: "Automatic",
    fuel: "Electric",
    status: "New Arrival",
    description: "The Audi RS e-tron GT represents the future of electric performance. With its dual-motor all-wheel drive system and 93.4 kWh battery, it delivers instant torque and impressive range while maintaining Audi's signature luxury.",
    features: [
      "Dual-Motor All-Wheel Drive",
      "93.4 kWh Battery Pack",
      "800V Fast Charging",
      "RS Sport Suspension",
      "Carbon Fiber Interior",
      "Matrix LED Headlights"
    ],
    specifications: {
      engine: "Dual Electric Motors",
      horsepower: 590,
      torque: "612 lb-ft",
      acceleration: "3.1s 0-60 mph",
      topSpeed: "155 mph",
      transmission: "Single-Speed Automatic",
      drivetrain: "All-Wheel Drive",
      range: "238 miles EPA",
      charging: "270 kW DC Fast Charging"
    },
    gallery: [
      "/audi-rs-etron-gt-white.jpg",
      "/audi-rs-etron-gt-interior.jpg",
      "/audi-rs-etron-gt-charging.jpg",
      "/audi-rs-etron-gt-side.jpg"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export async function addCarsToFirestore() {
  try {
    console.log("Starting to add cars to Firestore...")
    
    // Check if cars already exist
    const carsCollection = collection(db, "cars")
    const existingCars = await getDocs(carsCollection)
    
    if (!existingCars.empty) {
      console.log("Cars already exist in Firestore. Skipping...")
      return
    }
    
    // Add each car to Firestore
    for (const car of carsData) {
      const docRef = await addDoc(carsCollection, car)
      console.log(`Added car: ${car.name} with ID: ${docRef.id}`)
    }
    
    console.log("Successfully added all cars to Firestore!")
    
  } catch (error) {
    console.error("Error adding cars to Firestore:", error)
    throw error
  }
}

// Function to add a single car
export async function addSingleCar(carData: any) {
  try {
    const carsCollection = collection(db, "cars")
    const docRef = await addDoc(carsCollection, {
      ...carData,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    console.log(`Added car: ${carData.name} with ID: ${docRef.id}`)
    return docRef.id
  } catch (error) {
    console.error("Error adding car to Firestore:", error)
    throw error
  }
}

// Function to get all cars from Firestore
export async function getCarsFromFirestore() {
  try {
    const carsCollection = collection(db, "cars")
    const carsSnapshot = await getDocs(carsCollection)
    const cars = carsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return cars
  } catch (error) {
    console.error("Error getting cars from Firestore:", error)
    throw error
  }
}
