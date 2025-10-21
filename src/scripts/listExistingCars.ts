import { fetchExistingCars } from "../utils/fetchExistingCars"

async function main() {
  try {
    const cars = await fetchExistingCars()
    console.log(`\nTotal cars found: ${cars.length}`)
    
    if (cars.length === 0) {
      console.log("No cars found in the database.")
    } else {
      console.log("\nFirst few cars:")
      cars.slice(0, 3).forEach((car, index) => {
        console.log(`\n${index + 1}. Car ID: ${car.id}`)
        console.log(`   Fields available:`, Object.keys(car))
      })
    }
  } catch (error) {
    console.error("Failed to fetch cars:", error)
    process.exit(1)
  }
}

main()
