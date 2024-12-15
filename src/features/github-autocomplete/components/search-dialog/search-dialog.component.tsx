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
      <div className="w-full h-screen fixed top-0 left-0 bg-slate-950 opacity-40" onClick={onClose} />
      <div className="absolute p-3 -top-3 -right-3 bg-slate-950 shadow-xl rounded-xl h-fit max-h-[80vh] w-[calc(100%+26px)] border-2 border-slate-600 grid grid-rows-[32px,1fr] gap-2">
        <SearchBar onChange={handleSearch} />
        <SearchResults search={search} />
      </div>
    </>
  )
}

export default SearchDialog
