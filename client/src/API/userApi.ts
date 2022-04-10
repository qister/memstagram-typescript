import { useQuery } from 'react-query'
import axios from 'axios'

import { axiosInstance } from './axios'
import { errorNotificate } from 'utils/errorNotificate'

//TODO решить что должен отправлять бэк в юзере и прописать тип
export const getUser = () =>
  axiosInstance.get<{ user: { email: string; nickname?: string } }>('/api/v1/users/info')

export const useUser = () =>
  useQuery('user', getUser, {
    staleTime: Infinity,
    onError: (error) => {
      if (axios.isAxiosError(error)) errorNotificate(error)
    },
  })
