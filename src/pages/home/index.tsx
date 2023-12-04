import Container from "../../components/container"
import { FiSearch } from "react-icons/fi"

export function Home() {
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
          <section className="text-black w-full rounded-lg">
            <img
              className="w-full max-h-[320px] rounded-lg hover:scale-105 duration-300"
              src="https://www.creativefabrica.com/wp-content/uploads/2023/01/02/Beautiful-Black-Lamborghini-Car-Graphic-55839841-1.png"
              alt="car"
            />
            <p className="font-bold mt-1 mb-2 px-2">Black Lamborghini</p>

            <div className="flex flex-col px-2">
              <span className="text-zinc-900 text-base mb-6">
                Year: 2016/2017 | 23.000km
              </span>
              <strong className="text-xl">$308.473</strong>
            </div>

            <div className="w-full h-px bg-black my-2"></div>

            <div className="px-2 pb-2">
              <span className="text-zinc-900">Los Angeles - CA</span>
            </div>
          </section>
          <section className="text-black w-full rounded-lg">
            <img
              className="w-full max-h-[320px] rounded-lg hover:scale-105 duration-300"
              src="https://www.creativefabrica.com/wp-content/uploads/2023/01/02/Beautiful-Black-Lamborghini-Car-Graphic-55839841-1.png"
              alt="car"
            />
            <p className="font-bold mt-1 mb-2 px-2">Black Lamborghini</p>

            <div className="flex flex-col px-2">
              <span className="text-zinc-900 text-base mb-6">
                Year: 2016/2017 | 23.000km
              </span>
              <strong className="text-xl">$308.473</strong>
            </div>

            <div className="w-full h-px bg-black my-2"></div>

            <div className="px-2 pb-2">
              <span className="text-zinc-900">Los Angeles - CA</span>
            </div>
          </section>
          <section className="text-black w-full rounded-lg">
            <img
              className="w-full max-h-[320px] rounded-lg hover:scale-105 duration-300"
              src="https://www.creativefabrica.com/wp-content/uploads/2023/01/02/Beautiful-Black-Lamborghini-Car-Graphic-55839841-1.png"
              alt="car"
            />
            <p className="font-bold mt-1 mb-2 px-2">Black Lamborghini</p>

            <div className="flex flex-col px-2">
              <span className="text-zinc-900 text-base mb-6">
                Year: 2016/2017 | 23.000km
              </span>
              <strong className="text-xl">$308.473</strong>
            </div>

            <div className="w-full h-px bg-black my-2"></div>

            <div className="px-2 pb-2">
              <span className="text-zinc-900">Los Angeles - CA</span>
            </div>
          </section>
          <section className="text-black w-full rounded-lg">
            <img
              className="w-full max-h-[320px] rounded-lg hover:scale-105 duration-300"
              src="https://www.creativefabrica.com/wp-content/uploads/2023/01/02/Beautiful-Black-Lamborghini-Car-Graphic-55839841-1.png"
              alt="car"
            />
            <p className="font-bold mt-1 mb-2 px-2">Black Lamborghini</p>

            <div className="flex flex-col px-2">
              <span className="text-zinc-900 text-base mb-6">
                Year: 2016/2017 | 23.000km
              </span>
              <strong className="text-xl">$308.473</strong>
            </div>

            <div className="w-full h-px bg-black my-2"></div>

            <div className="px-2 pb-2">
              <span className="text-zinc-900">Los Angeles - CA</span>
            </div>
          </section>
          <section className="text-black w-full rounded-lg">
            <img
              className="w-full max-h-[320px] rounded-lg hover:scale-105 duration-300"
              src="https://www.creativefabrica.com/wp-content/uploads/2023/01/02/Beautiful-Black-Lamborghini-Car-Graphic-55839841-1.png"
              alt="car"
            />
            <p className="font-bold mt-1 mb-2 px-2">Black Lamborghini</p>

            <div className="flex flex-col px-2">
              <span className="text-zinc-900 text-base mb-6">
                Year: 2016/2017 | 23.000km
              </span>
              <strong className="text-xl">$308.473</strong>
            </div>

            <div className="w-full h-px bg-black my-2"></div>

            <div className="px-2 pb-2">
              <span className="text-zinc-900">Los Angeles - CA</span>
            </div>
          </section>
          <section className="text-black w-full rounded-lg">
            <img
              className="w-full max-h-[320px] rounded-lg hover:scale-105 duration-300"
              src="https://www.creativefabrica.com/wp-content/uploads/2023/01/02/Beautiful-Black-Lamborghini-Car-Graphic-55839841-1.png"
              alt="car"
            />
            <p className="font-bold mt-1 mb-2 px-2">Black Lamborghini</p>

            <div className="flex flex-col px-2">
              <span className="text-zinc-900 text-base mb-6">
                Year: 2016/2017 | 23.000km
              </span>
              <strong className="text-xl">$308.473</strong>
            </div>

            <div className="w-full h-px bg-black my-2"></div>

            <div className="px-2 pb-2">
              <span className="text-zinc-900">Los Angeles - CA</span>
            </div>
          </section>
        </main>
      </div>
    </Container>
  )
}
