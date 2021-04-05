import { axiosInstance } from './axios'

export const getUser = async () => {
  try {
    const { data } = await axiosInstance.get(
      `/api/user/info`,
    )
    return data
  } catch (error) {
    throw error
  }
}
