import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ResultsListItem from "./results-list-item.component"

describe("ResultsListItem", () => {
  it("renders correctly with a name and URL", () => {
    render(
      <ResultsListItem
        name="Test name"
        url="https://test.com"
        type="user"
        isActive={false}
        index={0}
        avatar="https://test.com/avatar"
      />
    )

    const listItem = screen.getByTestId("results-list-item")

    expect(listItem).toBeInTheDocument()

    const link = screen.getByTestId("results-list-item__link")
    expect(link).toHaveAttribute("href", "https://test.com")
    expect(link).toHaveAttribute("target", "_blank")

    const name = screen.getByTestId("results-list-item__name")
    expect(name).toHaveTextContent("Test name")
  })

  it('renders correctly with an avatar image when type is "user"', () => {
    render(
      <ResultsListItem
        name="Test name"
        url="https://test.com"
        type="user"
        isActive={false}
        index={0}
        avatar="https://test.com/avatar"
      />
    )

    const avatar = screen.getByTestId("results-list-item__avatar")
    expect(avatar).toHaveAttribute("src", "https://test.com/avatar")
    expect(avatar).toHaveAttribute("alt", "Test name")

    const icon = screen.queryByTestId("results-list-item__icon")
    expect(icon).not.toBeInTheDocument()
  })

  it('renders correctly with an icon when type is "repo"', () => {
    render(
      <ResultsListItem
        name="Test name"
        url="https://test.com"
        type="repo"
        isActive={false}
        index={0}
        avatar="https://test.com/avatar"
      />
    )

    const icon = screen.getByTestId("results-list-item__icon")
    expect(icon).toBeInTheDocument()

    const avatar = screen.queryByTestId("results-list-item__avatar")
    expect(avatar).not.toBeInTheDocument()
  })

  it("changes background color when active", () => {
    render(
      <ResultsListItem
        name="Test name"
        url="https://test.com"
        type="user"
        isActive={true}
        index={0}
        avatar="https://test.com/avatar"
      />
    )

    const listItem = screen.getByTestId("results-list-item")
    expect(listItem).toHaveClass("bg-slate-800")
    expect(listItem).toHaveClass("before:bg-blue-600")
  })

  it("has correct hover style", () => {
    render(
      <ResultsListItem
        name="Test name"
        url="https://test.com"
        type="user"
        isActive={false}
        index={0}
        avatar="https://test.com/avatar"
      />
    )

    const listItem = screen.getByTestId("results-list-item")
    expect(listItem).toHaveClass("hover:bg-slate-800")
  })

  it("has correct id", () => {
    render(
      <ResultsListItem
        name="Test name"
        url="https://test.com"
        type="user"
        isActive={false}
        index={9}
        avatar="https://test.com/avatar"
      />
    )

    const listItem = screen.getByTestId("results-list-item")
    expect(listItem).toHaveAttribute("id", "result-9")
  })
})
