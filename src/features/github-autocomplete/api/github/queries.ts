import { createQueryKeys } from "@lukemorales/query-key-factory"
import { GetGithubSearchUsersParams } from "./types"
import { octokit } from "@/utils"

export const githubQueries = createQueryKeys("github", {
  githutSearchUsers: (params: GetGithubSearchUsersParams) => ({
    queryKey: [params],
    queryFn: async () => {
      const response = await octokit.rest.search.users({
        q: params.q,
        per_page: params.per_page,
      })

      return response.data
    },
  }),
})
