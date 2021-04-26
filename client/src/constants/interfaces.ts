export interface IMeme {
  //TODO мб тип надо поменять на ObjectId, хотя сейчас работает и так
  _id: string
  author: string
  description: string
  imgUrl: string
  likedBy: Array<string>
  liked: boolean
  created: string
}
