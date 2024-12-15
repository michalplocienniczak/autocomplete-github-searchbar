import { InboxIcon } from "@primer/octicons-react"

const ResultsNotFound = () => (
  <div className="w-full h-full min-h-32 overflow-y-auto grid items-center">
    <div className="flex flex-col gap-2">
      <div className="text-slate-400 text-center">
        <InboxIcon size={24} className="w-14 h-14" />
      </div>
      <div className="text-center">No results found</div>
    </div>
  </div>
)

export default ResultsNotFound
