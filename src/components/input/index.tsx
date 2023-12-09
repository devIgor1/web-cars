import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps {
  type: string
  name: string
  register: UseFormRegister<any>
  error?: string
  rules?: RegisterOptions
  placeholder: string
}

export function Input({
  name,
  register,
  type,
  error,
  rules,
  placeholder,
}: InputProps) {
  return (
    <div>
      <input
        className="w-full border-2 border-zinc-200 px-2 p-1 outline-none rounded-lg"
        type={type}
        {...register(name, rules)}
        id={name}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 font-poppins">{error}</p>}
    </div>
  )
}
