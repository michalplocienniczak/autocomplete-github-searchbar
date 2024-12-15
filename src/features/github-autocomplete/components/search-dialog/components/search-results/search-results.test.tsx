import { render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, Mock, vi } from "vitest"
import SearchResults from "./search-results.component"
import { useGetGithubSearchRepos, useGetGithubSearchUsers } from "@/features/github-autocomplete"
import { ErrorMessage, LoadingSkeleton, ResultsNotFound } from "./components"

vi.mock("@/features/github-autocomplete", () => ({
  useGetGithubSearchUsers: vi.fn(),
  useGetGithubSearchRepos: vi.fn(),
}))

const mockUseGetGithubSearchUsers = useGetGithubSearchUsers as Mock
const mockUseGetGithubSearchRepos = useGetGithubSearchRepos as Mock

describe("SearchResults", () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it("renders loading skeleton when data is loading", () => {
    mockUseGetGithubSearchUsers.mockReturnValue({ isLoading: true })
    mockUseGetGithubSearchRepos.mockReturnValue({ isLoading: true })

    render(<SearchResults search="test" />)

    expect(<LoadingSkeleton />)
  })

  describe("renders error messege", () => {
    it("when both hooks return an error", () => {
      mockUseGetGithubSearchUsers.mockReturnValue({
        isError: true,
        error: { message: "User search failed" },
      })
      mockUseGetGithubSearchRepos.mockReturnValue({
        isError: true,
        error: { message: "Repo search failed" },
      })

      render(<ErrorMessage message="User search failed" />)

      const message = screen.getByTestId("error-message__message")

      expect(message).toBeInTheDocument()
      expect(message).toHaveTextContent("User search failed")
    })

    it("when users hook returns an error", () => {
      mockUseGetGithubSearchUsers.mockReturnValue({
        isError: true,
        error: { message: "User search failed" },
      })
      mockUseGetGithubSearchRepos.mockReturnValue({ isLoading: false })

      render(<SearchResults search="test" />)

      const message = screen.getByTestId("error-message__message")

      expect(message).toBeInTheDocument()
      expect(message).toHaveTextContent("User search failed")
    })

    it("when repos hook returns an error", () => {
      mockUseGetGithubSearchUsers.mockReturnValue({ isLoading: false })
      mockUseGetGithubSearchRepos.mockReturnValue({
        isError: true,
        error: { message: "Repo search failed" },
      })

      render(<SearchResults search="test" />)

      const message = screen.getByTestId("error-message__message")

      expect(message).toBeInTheDocument()
      expect(message).toHaveTextContent("Repo search failed")
    })
  })

  it("renders message to enter at least 3 characters when search is too short", () => {
    mockUseGetGithubSearchUsers.mockReturnValue({ isLoading: false })
    mockUseGetGithubSearchRepos.mockReturnValue({ isLoading: false })
    render(<SearchResults search="te" />)

    const searchTooShort = screen.getByTestId("search-too-short")

    expect(searchTooShort).toBeInTheDocument()
    expect(searchTooShort).toHaveTextContent("Enter at least 3 characters to start searching.")
  })

  it("renders not found message when there are no users or repos", () => {
    mockUseGetGithubSearchUsers.mockReturnValue({
      data: { items: [] },
      isLoading: false,
    })
    mockUseGetGithubSearchRepos.mockReturnValue({
      data: { items: [] },
      isLoading: false,
    })

    render(<ResultsNotFound />)

    expect(screen.getByText(/no results found/i)).toBeInTheDocument()
  })

  describe("renders results list", () => {
    it("when users and repos are found", () => {
      mockUseGetGithubSearchUsers.mockReturnValue({
        data: { items: [{ id: 1, login: "user1", html_url: "https://user1.com", avatar_url: "" }] },
        isLoading: false,
      })
      mockUseGetGithubSearchRepos.mockReturnValue({
        data: { items: [{ id: 1, full_name: "repo1", html_url: "https://repo1.com" }] },
        isLoading: false,
      })

      render(<SearchResults search="test" />)

      expect(screen.getByText(/user1/i)).toBeInTheDocument()
      expect(screen.getByText(/repo1/i)).toBeInTheDocument()
    })

    it("when only users are found", () => {
      mockUseGetGithubSearchUsers.mockReturnValue({
        data: { items: [{ id: 1, login: "user1", html_url: "https://user1.com", avatar_url: "" }] },
        isLoading: false,
      })
      mockUseGetGithubSearchRepos.mockReturnValue({
        data: { items: [] },
        isLoading: false,
      })

      render(<SearchResults search="test" />)

      expect(screen.getByText(/user1/i)).toBeInTheDocument()
    })

    it("when only repos are found", () => {
      mockUseGetGithubSearchUsers.mockReturnValue({
        data: { items: [] },
        isLoading: false,
      })
      mockUseGetGithubSearchRepos.mockReturnValue({
        data: { items: [{ id: 1, full_name: "repo1", html_url: "https://repo1.com" }] },
        isLoading: false,
      })

      render(<SearchResults search="test" />)

      expect(screen.getByText(/repo1/i)).toBeInTheDocument()
    })
  })
})
