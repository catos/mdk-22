interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

export default function Input({ name, label, type = "text", ...rest }: InputProps) {

  const input = <input
    className="px-4 py-3 bg-gray-200 rounded w-full"
    type={type}
    id={name}
    name={name}
    {...rest} />

  if (type && type === "hidden") {
    return input
  }

  return (
    <div>
      {label &&
        <label className="font-bold text-gray-600 uppercase text-xs mb-1 mt-3" htmlFor={name}>
          {label}
        </label>}
      {input}
      {/* {errors?.title && <div>Title is required</div>} */}
    </div>
  )
}