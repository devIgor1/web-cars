import { ReactNode } from "react"

interface ButtonProps {
  onClick?: () => void
  type: string
  className?: string
  children: ReactNode
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="rounded-md bg-zinc-950 p-2 w-full text-white font-bold hover:bg-zinc-900 duration-300"
    >
      {children}
    </button>
  )
}
