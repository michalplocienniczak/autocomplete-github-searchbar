import { useGetGithubSearchRepos, useGetGithubSearchUsers } from "@/features/github-autocomplete"
import { LoadingSkeleton, ResultsList } from "./components"

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

  if (isUsersSearchError || isReposSearchError) return <div>Error: {usersError?.message ?? reposError?.message}</div>

  if (!users || users.items.length === 0 || !repos || repos.items.length === 0) return <div>No results found</div>

  return <ResultsList users={users.items} repos={repos.items} />
}

export default SearchResults
