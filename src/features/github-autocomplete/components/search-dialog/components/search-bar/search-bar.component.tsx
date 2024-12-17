import { SearchIcon, XCircleFillIcon } from "@primer/octicons-react"
import { useEffect, useRef, useState } from "react"

type SearchBarProps = {
  onChange: (value: string | undefined) => void
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  const [innerValue, setInnerValue] = useState<string>()
  const ref = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInnerValue(event.target.value)
  }

  useEffect(() => {
    onChange(innerValue)
  }, [innerValue, onChange])

  const handleClear = () => {
    setInnerValue(undefined)
    ref.current?.focus()
  }

  return (
    <div
      className="grid grid-cols-[16px,1fr,32px] items-center px-2 pr-1 text-xs bg-transparent border-[1px] border-solid border-border rounded h-8 text-secondary gap-2 w-full has-[input:focus-visible]:ring-accent has-[input:focus-visible]:ring-2 has-[input:focus-visible]:border-transparent"
      data-testid="search-bar"
    >
      <SearchIcon />
      <input
        ref={ref}
        type="text"
        value={innerValue ?? ""}
        onChange={handleChange}
        autoFocus
        className="peer py-1 px-0 bg-transparent h-full focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none text-xs text-primary"
        data-testid="search-bar__input"
      />
      {!!innerValue && (
        <button
          className="px-2 grid items-center hover:bg-background-hover h-full cursor-pointer"
          onClick={handleClear}
          data-testid="search-bar__clear-button"
        >
          <XCircleFillIcon size={16} />
        </button>
      )}
    </div>
  )
}

export default SearchBar
