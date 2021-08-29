import { ICredentials } from 'pages/Registration/registrationSlice'
import { axiosInstance } from './axios'

// TODO после успешной регистрации сетить сетить имейл в логин и перенаправлять на страницу логина

interface IGetRegistrationResult {
  user: { email: string }
}
export const getRegistration = (credentials: ICredentials) =>
  axiosInstance.post<IGetRegistrationResult>('/api/v1/auth/registration', credentials)
