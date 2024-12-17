import { render, screen, fireEvent } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import ResultsList from "./results-list.component"
import type { SearchRepo, SearchUser } from "@/features/github-autocomplete"

const mockUsers = [
  { id: 1, login: "auser1", html_url: "https://user1.com", avatar_url: "https://avatar1.com" },
  { id: 2, login: "cuser2", html_url: "https://user2.com", avatar_url: "https://avatar2.com" },
] as SearchUser[]

const mockRepos = [
  { id: 3, full_name: "brepo1", html_url: "https://repo1.com" },
  { id: 4, full_name: "drepo2", html_url: "https://repo2.com" },
] as SearchRepo[]

describe("ResultsList", () => {
  beforeEach(() => {
    window.open = vi.fn()
    HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  it("renders all search results sorted by name", () => {
    render(<ResultsList users={mockUsers} repos={mockRepos} />)

    const listItems = screen.getAllByTestId("results-list-item__name")
    expect(listItems).toHaveLength(4)

    const renderedTexts = listItems.map((item) => item.textContent)
    expect(renderedTexts).toEqual(["auser1", "brepo1", "cuser2", "drepo2"])
  })

  it("renders user avatars for user results", () => {
    render(<ResultsList users={mockUsers} repos={[]} />)

    const avatarImages = screen.getAllByRole("img")
    expect(avatarImages).toHaveLength(2)
    expect(avatarImages[0]).toHaveAttribute("src", "https://avatar1.com")
    expect(avatarImages[1]).toHaveAttribute("src", "https://avatar2.com")
  })

  it("handles keyboard navigation with ArrowDown and ArrowUp", () => {
    render(<ResultsList users={mockUsers} repos={mockRepos} />)

    // Press ArrowDown twice
    fireEvent.keyDown(window, { key: "ArrowDown" })
    fireEvent.keyDown(window, { key: "ArrowDown" })

    let activeItem = screen.getByText("brepo1")
    expect(activeItem.closest("li")).toHaveClass("bg-background-hover-secondary")

    // Press ArrowUp
    fireEvent.keyDown(window, { key: "ArrowUp" })

    activeItem = screen.getByText("auser1")
    expect(activeItem.closest("li")).toHaveClass("bg-background-hover-secondary")
  })

  it("opens the selected item's URL in a new tab on Enter", () => {
    render(<ResultsList users={mockUsers} repos={mockRepos} />)

    // Navigate to second item
    fireEvent.keyDown(window, { key: "ArrowDown" })
    fireEvent.keyDown(window, { key: "ArrowDown" })

    // Press Enter
    fireEvent.keyDown(window, { key: "Enter" })

    expect(window.open).toHaveBeenCalledWith("https://repo1.com", "_blank")
  })

  it("scrolls the active item into view when navigating", () => {
    const { container } = render(<ResultsList users={mockUsers} repos={mockRepos} />)

    const scrollIntoViewMock = vi.fn()
    HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

    // Press ArrowDown
    fireEvent.keyDown(window, { key: "ArrowDown" })

    const activeElement = container.querySelector("#result-0")
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ block: "nearest" })
    expect(activeElement).toHaveClass("bg-background-hover-secondary")
  })

  it("removes event listeners on unmount", () => {
    const { unmount } = render(<ResultsList users={mockUsers} repos={mockRepos} />)

    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener")

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function))
  })
})
