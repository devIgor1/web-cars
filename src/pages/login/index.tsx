import Container from "../../components/container"
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "../../components/input"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../../services/firebaseConnection"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react"

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
  const [showPassword, setShowPassword] = useState(false)

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

  function handleLogin(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        console.log("logged in successfully", user)
        toast.success("User logged in successfull")
        navigate("/dashboard", { replace: true })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-bounce-gentle"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </div>

      <Container>
        <div className="relative z-10 flex items-center justify-center min-h-screen py-12">
          <div className="w-full max-w-md">
            {/* Back Button */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 mb-8 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to home</span>
            </Link>

            {/* Logo */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <img className="w-24 h-24 mx-auto mb-4" src={logo} alt="WebCars" />
                <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-lg"></div>
              </div>
              <h1 className="text-3xl font-bold text-gradient mb-2">Welcome Back</h1>
              <p className="text-white/70">Sign in to your account to continue</p>
            </div>

            {/* Login Form */}
            <div className="card p-8 animate-fade-in-up">
              <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    error={errors.email?.message}
                    register={register}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      error={errors.password?.message}
                      register={register}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500 focus:ring-offset-0" />
                    <span className="ml-2 text-sm text-white/70">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-primary-400 hover:text-primary-300 transition-colors duration-300">
                    Forgot password?
                  </a>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary w-full py-4 text-lg font-semibold"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/70">
                  Don't have an account?{" "}
                  <Link 
                    to="/register" 
                    className="text-primary-400 hover:text-primary-300 font-semibold transition-colors duration-300"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
