import Container from "../../components/container"
import logo from "../../assets/logo.png"
import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"

export function Login() {
  return (
    <div className="w-full min-h-screen bg-zinc-950 font-poppins">
      <Container>
        <div className="flex items-center flex-col justify-center">
          <img className="w-[300px]" src={logo} alt="" />

          <div className="bg-white w-full max-w-xl rounded-lg m-10">
            <form className="p-5 flex itesm-center justify-center flex-col">
              <label className="text-xl mb-2">Email</label>
              <input
                className="border-2 border-zinc-200 px-2 p-1 outline-none rounded mb-5"
                type="text"
              />
              <label className="text-xl  mb-2">Password</label>
              <input
                type="password"
                className="border-2 border-zinc-200 px-2 p-1 outline-none rounded"
              />
              <div className="flex items-center justify-center mt-5">
                <button className="border-2 border-black py-1 px-4 rounded font-bold hover:bg-black hover:text-white hover:scale-110 duration-300">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div>
            <Link
              className="flex items-center gap-2 text-white underline"
              to="/"
            >
              <FaArrowLeft size={28} />
              <h2>Back to home</h2>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
