import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, Mock, vi } from "vitest"
import SearchDialog from "./search-dialog.component"
import { useGetGithubSearchRepos, useGetGithubSearchUsers } from "@/features/github-autocomplete"

vi.mock("@/features/github-autocomplete", () => ({
  useGetGithubSearchUsers: vi.fn(),
  useGetGithubSearchRepos: vi.fn(),
}))

const mockUseGetGithubSearchUsers = useGetGithubSearchUsers as Mock
const mockUseGetGithubSearchRepos = useGetGithubSearchRepos as Mock

describe("SearchDialog", () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it("renders correctly", () => {
    mockUseGetGithubSearchUsers.mockReturnValue({ isLoading: false })
    mockUseGetGithubSearchRepos.mockReturnValue({ isLoading: false })
    render(<SearchDialog onClose={mockOnClose} />)

    const dialogsMask = screen.getByTestId("search-dialog__mask")
    expect(dialogsMask).toBeInTheDocument()

    const dialog = screen.getByTestId("search-dialog")
    expect(dialog).toBeInTheDocument()

    const searchBar = screen.getByTestId("search-bar")
    expect(searchBar).toBeInTheDocument()

    const searchTooShort = screen.getByTestId("search-too-short")
    expect(searchTooShort).toBeInTheDocument()
  })

  describe("calls onClose", () => {
    it("when mask is clicked", () => {
      mockUseGetGithubSearchUsers.mockReturnValue({ isLoading: false })
      mockUseGetGithubSearchRepos.mockReturnValue({ isLoading: false })
      render(<SearchDialog onClose={mockOnClose} />)

      const dialogsMask = screen.getByTestId("search-dialog__mask")
      dialogsMask.click()

      expect(mockOnClose).toHaveBeenCalled()
    })

    it("when 'Escape' key is pressed", () => {
      render(<SearchDialog onClose={mockOnClose} />)

      fireEvent.keyDown(window, { key: "Escape" })

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })

  it("does not call onClose when dialog is clicked", () => {
    mockUseGetGithubSearchUsers.mockReturnValue({ isLoading: false })
    mockUseGetGithubSearchRepos.mockReturnValue({ isLoading: false })
    render(<SearchDialog onClose={mockOnClose} />)

    const dialog = screen.getByTestId("search-dialog")
    dialog.click()

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it("updates search results on SearchBar input change", () => {
    mockUseGetGithubSearchUsers.mockReturnValue({ isLoading: false })
    mockUseGetGithubSearchRepos.mockReturnValue({ isLoading: false })

    render(<SearchDialog onClose={mockOnClose} />)

    const searchInput = screen.getByTestId("search-bar__input")

    fireEvent.change(searchInput, { target: { value: "react" } })

    expect(searchInput).toHaveValue("react")
  })

  it("cleans up event listener on unmount", () => {
    const { unmount } = render(<SearchDialog onClose={mockOnClose} />)

    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener")

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function))
  })
})
