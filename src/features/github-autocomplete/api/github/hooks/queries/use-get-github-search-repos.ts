import { useQuery } from "@tanstack/react-query"
import { githubQueries } from "../../queries"
import { GetGithubSearchReposParams } from "../../types"

export const useGetGithubSearchRepos = (params: GetGithubSearchReposParams) =>
  useQuery({
    ...githubQueries.githubSearchRepos(params),
    enabled: !!params.q && params.q.length > 3,
  })
