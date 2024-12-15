export type SearchReslutType = {
  id: number
  name: string
  url: string
} & (
  | {
      type: "user"
      avatar: string
    }
  | {
      type: "repo"
    }
)
