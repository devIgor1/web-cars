import Container from "../../components/container"
import logo from "../../assets/logo.png"
import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "../../components/input"

const schema = z.object({
  email: z
    .string()
    .email({ message: "Enter a valid email address" })
    .min(1, { message: "Email is required" })
    .refine((value) => {
      return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value)
    }),
  password: z.string().min(1, "Password is required"),
})

type FormData = z.infer<typeof schema>

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function handleLogin(data: FormData) {
    console.log("IT WORKED", data)
  }

  return (
    <div className="w-full min-h-screen bg-zinc-950 font-poppins">
      <Container>
        <div className="flex items-center flex-col justify-center">
          <img className="w-[300px]" src={logo} alt="" />

          <div className="bg-white w-full max-w-xl rounded-lg m-10">
            <form
              className="p-5 flex itesm-center justify-center flex-col"
              onSubmit={handleSubmit(handleLogin)}
            >
              <label className="text-xl mb-2">Email</label>
              <Input
                type="email"
                name="email"
                error={errors.email?.message}
                register={register}
              />

              <label className="text-xl mt-2">Password</label>
              <Input
                type="password"
                name="password"
                error={errors.password?.message}
                register={register}
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
