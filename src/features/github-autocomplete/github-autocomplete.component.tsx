import { useRef } from "react"
import { SearchButton, SearchDialog } from "./components"

const GithubAutocomplete = () => {
  const ref = useRef<HTMLDialogElement>(null)

  return (
    <div>
      <SearchButton onClick={() => ref.current?.showModal()} />
      <SearchDialog ref={ref} />
    </div>
  )
}

export default GithubAutocomplete
