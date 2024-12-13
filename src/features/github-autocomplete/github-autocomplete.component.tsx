import { useState } from "react"
import { SearchButton, SearchDialog } from "./components"
import classNames from "classnames"

const GithubAutocomplete = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={classNames("relative", {
        "w-4/5": isOpen,
      })}
    >
      <SearchButton onClick={() => setIsOpen(true)} />
      {isOpen && <SearchDialog onClose={() => setIsOpen(false)} />}
    </div>
  )
}

export default GithubAutocomplete
