import { Endpoints } from "@octokit/types"

export type GetGithubSearchUsersParams = {
  q?: string
  per_page?: number
}

export type SearchUser = Endpoints["GET /search/users"]["response"]["data"]["items"][number]

export type GetGithubSearchReposParams = {
  q?: string
  per_page?: number
}

export type SearchRepo = Endpoints["GET /search/repositories"]["response"]["data"]["items"][number]
