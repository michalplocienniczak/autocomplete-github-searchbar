import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import SearchBar from "./search-bar.component"

describe("SearchBar", () => {
  it("renders input element", () => {
    render(<SearchBar onChange={() => {}} />)
    const inputElement = screen.getByTestId("search-bar")
    expect(inputElement).toBeInTheDocument()
  })

  it("calls onChange when input value changes", () => {
    const onChange = vi.fn()
    render(<SearchBar onChange={onChange} />)
    const inputElement = screen.getByTestId("search-bar__input")
    fireEvent.change(inputElement, { target: { value: "test" } })
    expect(onChange).toHaveBeenCalledWith("test")
  })

  it("clears input value when clear button is clicked", () => {
    const onChange = vi.fn()
    render(<SearchBar onChange={onChange} />)
    const inputElement = screen.getByTestId("search-bar__input")
    fireEvent.change(inputElement, { target: { value: "test" } })
    const clearButton = screen.getByTestId("search-bar__clear-button")
    fireEvent.click(clearButton)
    expect(onChange).toHaveBeenCalledWith(undefined)
  })

  it("focuses input element when clear button is clicked", () => {
    const onChange = vi.fn()
    render(<SearchBar onChange={onChange} />)
    const inputElement = screen.getByTestId("search-bar__input")
    fireEvent.change(inputElement, { target: { value: "test" } })
    const clearButton = screen.getByTestId("search-bar__clear-button")
    fireEvent.click(clearButton)
    expect(document.activeElement).toEqual(inputElement)
  })
})
