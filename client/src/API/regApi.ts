import { ICredentials } from '../redux/authToolkitRedux/StoreSlices/registration'
import { axiosInstance } from './axios'

// TODO после успешной регистрации сетить сетить имейл в логин и перенаправлять на страницу логина

interface IGetRegistrationResult {
  user: { email: string }
}
export const getRegistration = (data: FormData) =>
  axiosInstance.post<IGetRegistrationResult>(
    // '/api/auth/register',
    '/api/v1/auth/registration',
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
