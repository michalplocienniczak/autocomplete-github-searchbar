import { GithubAutocomplete } from "./features/github-autocomplete"

function App() {
  return (
    <div className="flex flex-col items-center w-full h-screen min-h-fit">
      <header className="p-4">
        <GithubAutocomplete />
      </header>
    </div>
  )
}

export default App
