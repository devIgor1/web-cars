import { Header } from "../header"
import { Outlet } from "react-router-dom"

export function Layout() {
  return (
    <div className="min-h-screen w-full bg-zinc-950">
      <Header />
      <div className="mt-14 ">
        <Outlet />
      </div>
    </div>
  )
}
