import { useGetGithubSearchRepos, useGetGithubSearchUsers } from "@/features/github-autocomplete"
import { ErrorMessage, LoadingSkeleton, ResultsList, ResultsNotFound } from "./components"

type SearchResultsProps = {
  search: string | undefined
}

const SearchResults = ({ search }: SearchResultsProps) => {
  const {
    data: users,
    isLoading: isUsersSearchLoading,
    isError: isUsersSearchError,
    error: usersError,
  } = useGetGithubSearchUsers({ q: search, per_page: 50 })

  const {
    data: repos,
    isLoading: isReposSearchLoading,
    isError: isReposSearchError,
    error: reposError,
  } = useGetGithubSearchRepos({ q: search, per_page: 50 })

  if (isUsersSearchLoading || isReposSearchLoading) return <LoadingSkeleton />

  if (isUsersSearchError || isReposSearchError)
    return (
      <ErrorMessage
        message={usersError?.message || reposError?.message || "An error occurred while fetching the search results"}
      />
    )

  const isUsersEmpty = !users || users.items.length === 0
  const isReposEmpty = !repos || repos.items.length === 0

  if (isUsersEmpty && isReposEmpty && (!search || search?.length < 3))
    return (
      <span
        className="italic text-secondary text-xs pl-2 py-1 border-l-2 border-secondary"
        data-testid="search-too-short"
      >
        Enter at least 3 characters to start searching.
      </span>
    )

  if (isUsersEmpty && isReposEmpty) return <ResultsNotFound />

  return <ResultsList users={users?.items ?? []} repos={repos?.items ?? []} />
}

export default SearchResults
