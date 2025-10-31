import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-background border-t-2 border-primary shadow-lg relative z-20 pointer-events-auto mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div>
            <h5 className="text-xl font-bold mb-4 text-foreground">Web Cars</h5>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Your trusted partner in finding the perfect luxury and performance vehicle.
            </p>
          </div>

          <div>
            <h6 className="font-bold mb-4 text-foreground">Quick Links</h6>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground hover:font-medium transition-all duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground hover:font-medium transition-all duration-300">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-foreground hover:font-medium transition-all duration-300">
                  Sell Your Car
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold mb-4 text-foreground">Support</h6>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground hover:font-medium transition-all duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-foreground hover:font-medium transition-all duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-foreground hover:font-medium transition-all duration-300">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 Web Cars. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground hover:font-medium transition-all duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground hover:font-medium transition-all duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground hover:font-medium transition-all duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
