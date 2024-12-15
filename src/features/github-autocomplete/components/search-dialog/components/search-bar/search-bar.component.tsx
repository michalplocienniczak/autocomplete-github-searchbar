import { SearchIcon, XCircleFillIcon } from "@primer/octicons-react"
import { useRef } from "react"

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onClear: () => void
}

const SearchBar = ({ value, onChange, onClear }: SearchBarProps) => {
  const ref = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const handleClear = () => {
    onClear()
    ref.current?.focus()
  }

  return (
    <div className="grid grid-cols-[16px,1fr,32px] items-center px-2 pr-1 text-xsbg-transparent border-[1px] border-solid border-slate-600 rounded h-8 text-slate-400 gap-2 w-full has-[input:focus-visible]:ring-blue-600 has-[input:focus-visible]:ring-2 has-[input:focus-visible]:border-transparent">
      <SearchIcon />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={handleChange}
        autoFocus
        className="peer py-1 px-0 bg-transparent h-full focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none text-xs text-white"
      />
      {!!value && (
        <button className="px-2 grid items-center hover:bg-slate-900 h-full cursor-pointer" onClick={handleClear}>
          <XCircleFillIcon size={16} />
        </button>
      )}
    </div>
  )
}

export default SearchBar
