import Container from "../../../components/container"
import { EditForm } from "../../../components/editForm"

export function EditCar() {
  return (
    <Container>
      <h1 className="text-4xl text-white mb-2 font-bold">Edit Your Car</h1>
      <div className="bg-white p-5 font-poppins rounded-lg">
        <EditForm />
      </div>
    </Container>
  )
}
