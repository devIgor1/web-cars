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
import { useEffect, useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import toast from "react-hot-toast"
import { FaArrowLeft, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa"

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
    <div className="w-full min-h-screen relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-muted/30"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-bounce-gentle"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </div>

      <Container>
        <div className="relative z-10 flex items-center justify-center min-h-screen py-12">
          <div className="w-full max-w-md">
            {/* Back Button */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors duration-300 mb-8 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to home</span>
            </Link>

            {/* Logo */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <img className="w-24 h-24 mx-auto mb-4" src={logo} alt="WebCars" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg"></div>
              </div>
              <h1 className="text-3xl font-bold text-primary mb-2">Create Account</h1>
              <p className="text-foreground/90">Join Web Cars and start your journey</p>
            </div>

            {/* Register Form */}
            <div className="card p-8 animate-fade-in-up">
              <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      type="text"
                      name="name"
                      error={errors.name?.message}
                      register={register}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      type="email"
                      name="email"
                      error={errors.email?.message}
                      register={register}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      error={errors.password?.message}
                      register={register}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    className="mt-1 rounded border-border bg-card text-primary focus:ring-primary focus:ring-offset-0" 
                    required
                  />
                  <span className="text-sm text-foreground/90">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-300">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-300">
                      Privacy Policy
                    </a>
                  </span>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary w-full py-4 text-lg font-semibold"
                >
                  Create Account
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-foreground/90">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-primary hover:text-primary/80 font-semibold transition-colors duration-300"
                  >
                    Sign in here
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
