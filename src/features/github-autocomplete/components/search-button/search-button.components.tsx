import { SearchIcon } from "@primer/octicons-react"
import { useEffect } from "react"

type SearchButtonProps = {
  onClick: () => void
}

const SearchButton = ({ onClick }: SearchButtonProps) => {
  useEffect(() => {
    const hanldeKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        onClick()
      }
    }

    window.addEventListener("keydown", hanldeKeyDown)

    return () => {
      window.removeEventListener("keydown", hanldeKeyDown)
    }
  }, [onClick])

  return (
    <button
      className="py-1 px-2 text-xs bg-transparent border-[1px] border-solid border-slate-700 rounded h-8 text-slate-400 flex items-center w-64 gap-2"
      onClick={onClick}
    >
      <SearchIcon />
      <span>
        Type
        <kbd className="border-[1px] border-solid border-slate-400 inline-grid w-[18px] h-[18px] items-center rounded mx-1">
          /
        </kbd>
        to search
      </span>
    </button>
  )
}

export default SearchButton
