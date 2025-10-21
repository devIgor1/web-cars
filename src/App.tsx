import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Dashboard } from "./pages/dashboard"
import { New } from "./pages/dashboard/new"
import { CarDetails } from "./pages/CarDetails"
import { About } from "./pages/about"
import { FAQ } from "./pages/faq"

import { Layout } from "./components/layout"
import { Private } from "./routes/Private"
import { EditCar } from "./pages/dashboard/edit"

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cars/:id",
        element: <CarDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/dashboard",
        element: (
          <Private>
            <Dashboard />
          </Private>
        ),
      },
      {
        path: "/dashboard/new",
        element: (
          <Private>
            <New />
          </Private>
        ),
      },
      {
        path: "/dashboard/edit/:id",
        element: (
          <Private>
            <EditCar />
          </Private>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
])

export { router }
