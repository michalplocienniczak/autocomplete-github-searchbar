import { useEffect, useRef, useState } from "react"
import { SearchReslutType } from "../../types"
import type { SearchUser, SearchRepo } from "@/features/github-autocomplete"
import { ResultsListItem } from "./components"

type ResultsListProps = {
  users: SearchUser[]
  repos: SearchRepo[]
}

const ResultsList = ({ users, repos }: ResultsListProps) => {
  const ref = useRef<HTMLUListElement>(null)
  const [currentSearchResultIndex, setCurrentSearchResultIndex] = useState<number>(-1)

  const usersSearchResults: SearchReslutType[] = users.map((user) => ({
    id: user.id,
    name: user.login,
    url: user.html_url,
    avatar: user.avatar_url,
    type: "user",
  }))

  const reposSearchResults: SearchReslutType[] = repos.map((repo) => ({
    id: repo.id,
    name: repo.full_name,
    url: repo.html_url,
    type: "repo",
  }))

  const searchResults = [...usersSearchResults, ...reposSearchResults].sort((a, b) => a.name.localeCompare(b.name))

  useEffect(() => {
    const activeElement = ref.current?.querySelector(`#result-${currentSearchResultIndex}`)
    activeElement?.scrollIntoView({ block: "nearest" })
  }, [currentSearchResultIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && currentSearchResultIndex < searchResults.length - 1) {
        e.preventDefault()
        setCurrentSearchResultIndex((prev) => (prev ?? -1) + 1)
      } else if (e.key === "ArrowUp" && currentSearchResultIndex > 0) {
        e.preventDefault()
        setCurrentSearchResultIndex((prev) => (prev ?? searchResults.length) - 1)
      } else if (e.key === "Enter") {
        window.open(searchResults[currentSearchResultIndex].url, "_blank")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [searchResults, currentSearchResultIndex, setCurrentSearchResultIndex])

  return (
    <ul className="overflow-y-auto" ref={ref}>
      {searchResults.map((result, index) => (
        <ResultsListItem
          key={result.id}
          index={index}
          url={result.url}
          name={result.name}
          type={result.type}
          isActive={index === currentSearchResultIndex}
          avatar={result.type === "user" ? result.avatar : undefined}
        />
      ))}
    </ul>
  )
}

export default ResultsList
