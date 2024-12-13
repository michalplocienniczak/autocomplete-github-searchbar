import { MarkGithubIcon } from "@primer/octicons-react"
import { GithubAutocomplete } from "./features/github-autocomplete"

function App() {
  return (
    <div className="flex flex-col items-center w-full h-screen min-h-fit">
      <header className="p-4 w-full flex justify-between items-center">
        <MarkGithubIcon className="w-6 h-6" />
        <GithubAutocomplete />
      </header>
    </div>
  )
}

export default App
