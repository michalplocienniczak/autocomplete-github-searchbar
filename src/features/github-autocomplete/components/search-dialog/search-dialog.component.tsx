import { useEffect, useState } from "react"
import { SearchBar } from "./components"
import { SearchResults } from "./components/search-results"
import { debounce } from "lodash"

type SearchDialogProps = {
  onClose: () => void
}

const SearchDialog = ({ onClose }: SearchDialogProps) => {
  const [search, setSearch] = useState<string>()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const handleSearch = debounce((value: string | undefined) => {
    setSearch(value)
  }, 300)

  return (
    <>
      <div
        className="w-full h-screen fixed top-0 left-0 bg-background opacity-40"
        onClick={onClose}
        data-testid="search-dialog__mask"
      />
      <div
        className="absolute p-3 top-0 left-0 right-auto md:-top-3 md:-right-3 md:left-auto bg-background shadow-xl rounded-xl h-fit max-h-[80vh] w-full md:w-[calc(100%+26px)] border-2 border-border grid grid-rows-[32px,1fr] gap-2"
        data-testid="search-dialog"
      >
        <SearchBar onChange={handleSearch} />
        <SearchResults search={search} />
      </div>
    </>
  )
}

export default SearchDialog
