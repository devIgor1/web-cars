import { Header } from "../Header"
import { Footer } from "../Footer"
import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"

export function Layout() {
  const location = useLocation()

  // Scroll to top when route changes
  useEffect(() => {
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, 0)
  }, [location.pathname])
  
  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Beautiful Light Background with Subtle Patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50/30"></div>
      
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.02),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.01),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.01),transparent_50%)]"></div>
      </div>
      
      {/* Subtle Floating Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-gray-100/20 to-gray-200/10 rounded-full blur-3xl animate-bounce-gentle"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-gray-200/20 to-gray-300/10 rounded-full blur-3xl animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-gray-100/20 to-gray-200/10 rounded-full blur-3xl animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-gray-200/15 to-gray-300/10 rounded-full blur-2xl animate-bounce-gentle" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="pt-20 flex-1 relative">
          <Outlet />
        </main>
        <div className="relative z-20">
          <Footer />
        </div>
      </div>
    </div>
  )
}
