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
    className={classNames("relative p-2 rounded hover:bg-slate-800", {
      "bg-slate-800 before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:rounded before:h-full before:bg-blue-600":
        isActive,
    })}
  >
    <a href={url} className="flex items-center justify-between text-xs" target="_blank">
      <div className="flex items-center gap-2">
        {type === "user" && avatar && (
          <div>
            <img src={avatar} alt={name} className="w-4 h-4 rounded-full" />
          </div>
        )}
        {type === "repo" && <RepoIcon className="w-4 h-4 text-slate-400" />}
        <span>{name}</span>
      </div>
      <span className="text-slate-400">Jump to</span>
    </a>
  </li>
)

export default ResultsListItem
