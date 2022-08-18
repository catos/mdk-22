import type { InputHTMLAttributes } from "react"

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string
  label: string
  // type?: string
}

export function FormField({ id, name, htmlFor, label, type = 'text', ...rest }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-slate-600 font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={htmlFor}
        name={htmlFor}
        {...rest}
        className="w-full p-2 rounded-xl my-2 bg-slate-100"
      />
    </div>
  )
}