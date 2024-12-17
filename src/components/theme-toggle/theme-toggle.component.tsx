import { MoonIcon, SunIcon } from "@primer/octicons-react"
import { useEffect } from "react"
import { useLocalStorage } from "react-use"

const ThemeToggle = () => {
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const [theme, setTheme] = useLocalStorage("theme", systemPrefersDark ? "dark" : "light")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div onClick={toggleTheme} className="cursor-pointer p-2 rounded hover:bg-background-hover grid items-center">
      {theme === "dark" ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
    </div>
  )
}

export default ThemeToggle
