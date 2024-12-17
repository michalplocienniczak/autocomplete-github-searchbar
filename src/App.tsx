import { MarkGithubIcon } from "@primer/octicons-react"
import { GithubAutocomplete } from "./features/github-autocomplete"

import { ThemeToggle } from "./components"

const App = () => (
  <div className="flex flex-col items-center w-full h-screen min-h-fit">
    <header className="p-4 w-full flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <MarkGithubIcon className="w-6 h-6" />
        <ThemeToggle />
      </div>
      <GithubAutocomplete />
    </header>
  </div>
)

export default App
