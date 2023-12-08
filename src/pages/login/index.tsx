import Container from "../../components/container"
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "../../components/input"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../../services/firebaseConnection"

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
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function handleLogin(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        console.log("logged in successfully", user)
        navigate("/dashboard", { replace: true })
      })
      .catch((err) => {
        console.log(err)
      })
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
          <div className="text-white">
            <h2 className="text-xl">
              New user?{" "}
              <Link className="underline" to="/register">
                Sign up
              </Link>{" "}
              to get started.
            </h2>
          </div>
          <div className="text-white flex items-center justify-center mt-16">
            <Link to="/" className="underline">
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
