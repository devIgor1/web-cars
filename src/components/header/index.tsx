export function Header() {
  return (
    <>
      <header className="h-28 flex items-center justify-between px-16 font-poppins font-bold">
        <img className="h-28" src="./logo.png" alt="logo" />
        <div className=" flex items-center gap-2">
          <button className="text-white border-2 px-7 py-2 rounded hover:bg-white hover:text-black duration-300">
            Login
          </button>
          <button className="text-black bg-white px-7 py-2.5 rounded hover:scale-105 duration-300">
            Sign Up
          </button>
        </div>
      </header>
    </>
  )
}
