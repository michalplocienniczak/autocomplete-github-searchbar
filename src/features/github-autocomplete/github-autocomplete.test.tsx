import { act, fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, Mock, vi } from "vitest"
import GithubAutocomplete from "./github-autocomplete.component"

import { useGetGithubSearchRepos, useGetGithubSearchUsers } from "@/features/github-autocomplete"

vi.mock("@/features/github-autocomplete", () => ({
  useGetGithubSearchUsers: vi.fn(),
  useGetGithubSearchRepos: vi.fn(),
}))

const mockUseGetGithubSearchUsers = useGetGithubSearchUsers as Mock
const mockUseGetGithubSearchRepos = useGetGithubSearchRepos as Mock

describe("github-autocomplete", () => {
  beforeEach(() => {
    mockUseGetGithubSearchUsers.mockReturnValue({ isLoading: false })
    mockUseGetGithubSearchRepos.mockReturnValue({ isLoading: false })
  })

  it("renders correctly", () => {
    render(<GithubAutocomplete />)
    const searchButton = screen.getByTestId("search-button")
    expect(searchButton).toBeInTheDocument()
  })

  describe("opens search dialog", () => {
    it("when button is clicked", () => {
      render(<GithubAutocomplete />)
      const searchButton = screen.getByTestId("search-button")

      act(() => {
        searchButton.click()
      })
      const searchDialog = screen.getByTestId("search-dialog")
      expect(searchDialog).toBeInTheDocument()
    })

    it("when '/' key is pressed", () => {
      render(<GithubAutocomplete />)
      act(() => {
        fireEvent.keyDown(window, { key: "/" })
      })
      const searchDialog = screen.getByTestId("search-dialog")
      expect(searchDialog).toBeInTheDocument()
    })
  })

  describe("when opens search dialog", () => {
    it("SearchBar is focused", () => {
      render(<GithubAutocomplete />)
      const searchButton = screen.getByTestId("search-button")

      act(() => {
        searchButton.click()
      })
      const searchBar = screen.getByTestId("search-bar__input")
      expect(document.activeElement).toEqual(searchBar)
    })

    it("with '/, 'search-bar' is empty", () => {
      render(<GithubAutocomplete />)
      act(() => {
        fireEvent.keyDown(window, { key: "/" })
      })
      const searchBar = screen.getByTestId("search-bar__input")
      expect(searchBar).toHaveValue("")
    })
  })

  describe("closes search dialog", () => {
    it("when 'Escape' key is pressed", () => {
      render(<GithubAutocomplete />)
      const searchButton = screen.getByTestId("search-button")

      act(() => {
        searchButton.click()
      })
      const searchDialog = screen.getByTestId("search-dialog")
      act(() => {
        fireEvent.keyDown(window, { key: "Escape" })
      })
      expect(searchDialog).not.toBeInTheDocument()
    })

    it("when mask is clicked", () => {
      render(<GithubAutocomplete />)
      const searchButton = screen.getByTestId("search-button")

      act(() => {
        searchButton.click()
      })
      const searchDialog = screen.getByTestId("search-dialog")
      const mask = screen.getByTestId("search-dialog__mask")
      act(() => {
        mask.click()
      })
      expect(searchDialog).not.toBeInTheDocument()
    })
  })
})
