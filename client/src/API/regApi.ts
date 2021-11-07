import { ICredentials } from 'pages/Registration/registrationSlice'
import { axiosInstance } from './axios'

interface IGetRegistrationResult {
  user: { email: string; nickname: string }
}
export const getRegistration = (credentials: ICredentials) =>
  axiosInstance.post<IGetRegistrationResult>('/api/v1/auth/registration', credentials)
