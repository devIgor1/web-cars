import { addCarsToFirestore } from "../utils/addCarsToFirestore"

// Run the script
async function main() {
  try {
    await addCarsToFirestore()
    console.log("Database population completed successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Failed to populate database:", error)
    process.exit(1)
  }
}

main()


