import Container from "../../components/container"
import logo from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "../../components/input"
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth"
import { auth } from "../../services/firebaseConnection"
import { useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import toast from "react-hot-toast"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .refine(
      (value) => {
        return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value)
      },
      { message: "Invalid email format" }
    ),
  password: z
    .string()
    .min(6, "Your password should contain at least 6 characters."),
})

type FormData = z.infer<typeof schema>

export function Register() {
  const { handleUserInfo } = useContext(AuthContext)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth)
    }

    handleLogout()
  }, [])

  async function handleRegister(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        })

        handleUserInfo({
          email: data.email,
          name: data.name,
          uid: user.user.uid,
        })
        toast.success("User registered successfully")
        navigate("/dashboard", {
          replace: true,
        })
      })
      .catch((err) => {
        console.log("Failed to register user", err)
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
              onSubmit={handleSubmit(handleRegister)}
            >
              <label className="text-xl mb-2">Name</label>
              <Input
                type="name"
                name="name"
                error={errors.name?.message}
                register={register}
              />
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
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="text-white">
            <h2 className="text-xl">
              Already a member?{" "}
              <Link to="/login" className="text-white text-xl underline">
                Log in
              </Link>{" "}
              here
            </h2>
            <div className="text-white flex items-center justify-center mt-16">
              <Link to="/" className="underline">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
