import { render, screen } from "@testing-library/react"
import { describe, expect, vi, it } from "vitest"
import SearchButton from "./search-button.components"
import userEvent from "@testing-library/user-event"

describe("SearchButton", () => {
  it("renders correctly", () => {
    render(<SearchButton onClick={() => {}} />)

    const button = screen.getByTestId("search-button")

    expect(button).toBeInTheDocument()
  })

  it("calls onClick when button is clicked", async () => {
    const onClick = vi.fn()
    render(<SearchButton onClick={onClick} />)

    const button = screen.getByTestId("search-button")

    await userEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("calls onClick when '/' key is pressed", async () => {
    const onClick = vi.fn()
    render(<SearchButton onClick={onClick} />)

    const event = new KeyboardEvent("keydown", { key: "/" })
    window.dispatchEvent(event)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("does not call onClick when other key is pressed", async () => {
    const onClick = vi.fn()
    render(<SearchButton onClick={onClick} />)

    const event = new KeyboardEvent("keydown", { key: "a" })
    window.dispatchEvent(event)

    expect(onClick).not.toHaveBeenCalled()
  })

  it("does not call onClick when '/' key is pressed with modifier", async () => {
    const onClick = vi.fn()
    render(<SearchButton onClick={onClick} />)

    const event = new KeyboardEvent("keydown", { key: "/", ctrlKey: true })
    window.dispatchEvent(event)

    expect(onClick).not.toHaveBeenCalled()
  })

  it("removes event listener when component is unmounted", () => {
    const handleClick = vi.fn()
    const { unmount } = render(<SearchButton onClick={handleClick} />)

    unmount()

    const event = new KeyboardEvent("keydown", { key: "/" })
    window.dispatchEvent(event)

    expect(handleClick).not.toHaveBeenCalled()
  })
})
