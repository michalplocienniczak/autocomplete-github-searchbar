import classNames from "classnames"
import { SearchReslutType } from "../../../../types"
import { RepoIcon } from "@primer/octicons-react"

type ResultsListItemProps = {
  name: string
  url: string
  type: SearchReslutType["type"]
  isActive: boolean
  index: number
  avatar?: string
}

const ResultsListItem = ({ name, url, type, avatar, isActive, index }: ResultsListItemProps) => (
  <li
    id={`result-${index}`}
    className={classNames("relative p-2 rounded hover:bg-background-hover-secondary", {
      "bg-background-hover-secondary before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:rounded before:h-full before:bg-accent":
        isActive,
    })}
    data-testid="results-list-item"
  >
    <a
      href={url}
      className="flex items-center justify-between text-xs gap-2 md:gap-0"
      target="_blank"
      data-testid="results-list-item__link"
    >
      <div className="flex items-center gap-2">
        {type === "user" && avatar && (
          <div>
            <img src={avatar} alt={name} className="w-4 h-4 rounded-full" data-testid="results-list-item__avatar" />
          </div>
        )}
        {type === "repo" && (
          <span data-testid="results-list-item__icon">
            <RepoIcon className="w-4 h-4 text-secondary" />
          </span>
        )}
        <span data-testid="results-list-item__name">{name}</span>
      </div>
      <span className="text-secondary whitespace-nowrap">Jump to</span>
    </a>
  </li>
)

export default ResultsListItem
