export function Header() {
  return (
    <>
      <header className="h-28 flex items-center justify-between px-16 font-poppins ">
        <img className="h-28" src="./logo.png" alt="logo" />
        <div>
          <ul className="flex items-center gap-5 text-white">
            <li className="hover:underline">
              <a href="/login">Login</a>
            </li>
            <li className="hover:underline">
              <a href="/register">Register</a>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}
