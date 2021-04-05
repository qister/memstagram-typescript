import { ICredentials } from '../redux/authToolkitRedux/StoreSlices/registration'
import { axiosInstance } from './axios'

export const fetchRegistration = async (credentials: ICredentials) => {
  try {
    const response = axiosInstance.post('/api/auth/register', credentials)
    return response
  } catch (error) {
    throw new Error(error.message || 'Что-то пошло не так')
  }
}
