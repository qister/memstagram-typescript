import { IMeme } from 'constants/interfaces'
import { axiosInstance } from './axios'

// TODO опреледиться что возвращается с бэка и правильно описать IMeme
interface IGetMemesReult {
  total: number
  next: {
    page: number
    limit: number
  }
  previous: {
    page: number
    limit: number
  }
  memes: IMeme[]
}

export const getMemeList = (page: number) =>
  axiosInstance.get<IGetMemesReult>(`/api/v1/memes/list?page=${page}&limit=3`)

export const getUserMemes = () =>
  axiosInstance.get<{ memes: IMeme[]; total: number }>(`/api/v1/users/user_memes`)

export const likeMeme = (_id: string) =>
  axiosInstance.post<{ meme: IMeme }>('/api/v1/memes/like', { _id })

interface IUploadMemeResult {
  memes: IMeme[]
}

export const uploadMeme = (data: FormData) =>
  axiosInstance.post<IUploadMemeResult>('api/v1/memes/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
