import { RegisterOptions, UseFormRegister } from "react-hook-form"
import { Input as ShadcnInput } from "../ui/input"
import { cn } from "../../lib/utils"

interface InputProps {
  type: string
  name: string
  register: UseFormRegister<any>
  error?: string
  rules?: RegisterOptions
  placeholder?: string
  className?: string
}

export function Input({
  name,
  register,
  type,
  error,
  rules,
  placeholder,
  className,
}: InputProps) {
  return (
    <div className="space-y-1.5">
      <ShadcnInput
        type={type}
        {...register(name, rules)}
        id={name}
        placeholder={placeholder}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
      />
      {error && (
        <p className="text-sm text-destructive font-medium">{error}</p>
      )}
    </div>
  )
}
