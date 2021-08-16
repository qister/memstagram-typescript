import axios from 'axios'
import { getAccessTokenFromCookie } from 'utils/auth'

const { NODE_ENV, REACT_APP_PROD_SERVER_URL, REACT_APP_DEV_SERVER_URL } = process.env
// TODO вынести эти переменные(ссылки) на сервер и убрать из локального конфига
export const baseURL =
  NODE_ENV === 'production'
    ? REACT_APP_PROD_SERVER_URL
    : NODE_ENV === 'test'
    ? ''
    : REACT_APP_DEV_SERVER_URL

export const axiosInstance = axios.create({
  // TODO уменьший таймаут как будет нормальный сервер
  timeout: 100000,
  baseURL,
  withCredentials: true,
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
