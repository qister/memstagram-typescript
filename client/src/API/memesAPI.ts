import { useMutation, useQuery } from 'react-query'
import axios from 'axios'

import { IMeme } from 'constants/interfaces'
import { axiosInstance } from './axios'
import { errorNotificate } from 'utils/errorNotificate'

export const DEFAULT_MEMES_LIMIT = 3

// TODO опреледиться что возвращается с бэка и правильно описать IMeme
export interface IGetMemesReult {
  total: number
  next?: {
    page: number
    limit: number
  }
  previous: {
    page: number
    limit: number
  }
  memes: IMeme[]
}

export const getMemeList = (page: number, limit = DEFAULT_MEMES_LIMIT) =>
  axiosInstance.get<IGetMemesReult>(`/api/v1/memes/list`, {
    params: { page, limit },
  })

export const getUserMemes = () =>
  axiosInstance.get<{ memes: IMeme[]; total: number }>(`/api/v1/users/user_memes`)

export const useUserMemes = () =>
  useQuery('userMemes', getUserMemes, {
    onError: (error) => {
      if (axios.isAxiosError(error)) errorNotificate(error)
    },
  })

export const likeMeme = (_id: string) =>
  axiosInstance.post<{ meme: IMeme }>('/api/v1/memes/like', { _id })

interface IUploadMemeResult {
  memes: IMeme[]
}

export const uploadMemes = (data: FormData) =>
  axiosInstance.post<IUploadMemeResult>('api/v1/memes/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const useUploadMemes = () =>
  useMutation(uploadMemes, {
    onError: (error) => {
      if (axios.isAxiosError(error)) errorNotificate(error)
    },
  })
