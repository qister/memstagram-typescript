export type AuthForm = {
  email: string
  password: string
}

export type Meme = {
  liked: boolean
  likesNumber?: any
  author?: string
  imgUrl: string
}