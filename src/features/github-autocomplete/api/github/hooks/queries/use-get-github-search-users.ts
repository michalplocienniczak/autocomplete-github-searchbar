import { useQuery } from "@tanstack/react-query"
import { GetGithubSearchUsersParams } from "../../types"
import { githubQueries } from "../../queries"

export const useGetGithubSearchUsers = (params: GetGithubSearchUsersParams) =>
  useQuery({
    ...githubQueries.githutSearchUsers(params),
    enabled: !!params.q && params.q.length > 3,
  })
