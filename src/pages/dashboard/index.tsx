import Container from "../../components/container"
import { DashboardHeader } from "../../components/panelHeader"
import { FiTrash2 } from "react-icons/fi"

export function Dashboard() {
  return (
    <Container>
      <DashboardHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-2 font-poppins">
        <section className="w-full bg-white p-5 rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-[320px]"
            src="https://firebasestorage.googleapis.com/v0/b/webcars-45ad1.appspot.com/o/images%2F8xQfcL0sjwPmJfPIWKJHysjGhEl2%2Fccfa50fe-6cc8-48af-928f-82260309e4c9?alt=media&token=a8e6372f-5249-4c24-9a03-5447c800646a"
            alt="car image"
          />
          <p className="font-bold mt-1 px-2 mb-2 text-xl">Black Lamborghini</p>

          <div className="flex flex-col px-2 relative">
            <span className="text-zinc-900 text-base mb-6">
              Year: 2023 | 125.263 km
            </span>

            <strong className="text-xl">$ 123.123</strong>
            <button className="text-red-500 absolute rounded-full right-2 top-12 hover:scale-110 duration-300">
              <FiTrash2 size={26} />
            </button>
          </div>

          <div className="w-full h-px bg-black my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-zinc-900">New York</span>
          </div>
        </section>
      </main>
    </Container>
  )
}
