import { SearchIcon } from "@primer/octicons-react"
import { useEffect } from "react"

type SearchButtonProps = {
  onClick: () => void
}

const SearchButton = ({ onClick }: SearchButtonProps) => {
  useEffect(() => {
    const hanldeKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && !event.ctrlKey && !event.metaKey) {
        event.preventDefault()
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
      className="py-1 px-2 text-xs bg-transparent border-[1px] border-solid border-border rounded h-8 text-secondary flex items-center w-fit md:w-64 gap-2"
      onClick={onClick}
      data-testid="search-button"
    >
      <SearchIcon />
      <span className="hidden md:block">
        Type
        <kbd className="border-[1px] border-solid border-secondary inline-grid w-[18px] h-[18px] items-center rounded mx-1">
          /
        </kbd>
        to search
      </span>
    </button>
  )
}

export default SearchButton
