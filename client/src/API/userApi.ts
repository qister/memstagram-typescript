import { axiosInstance } from './axios'

//TODO решить что должен отправлять бэк в юзере и прописать тип
export const getUser = async () =>
  axiosInstance.get<{ user: { email: string } }>(
    // `/api/user/info`
    `/api/v1/users/info`,
  )
