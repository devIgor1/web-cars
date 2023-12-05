import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps {
  type: string
  name: string
  register: UseFormRegister<any>
  error?: string
  rules?: RegisterOptions
}

export function Input({ name, register, type, error, rules }: InputProps) {
  return (
    <div>
      <input
        className="w-full border-2 border-zinc-200 px-2 p-1 outline-none rounded"
        type={type}
        {...register(name, rules)}
        id={name}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
