import axios from 'axios'
import { getAccessTokenFromCookie } from 'utils/auth'

export const axiosInstance = axios.create({
  timeout: 3000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const tokenFromCookie = getAccessTokenFromCookie()

    if (tokenFromCookie) {
      config.headers.Authorization = `Bearer ${tokenFromCookie}`
    } else {
      delete axiosInstance.defaults.headers.common.Authorization
    }
    return config
  },

  (error) => Promise.reject(error),
)
