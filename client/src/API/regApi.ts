import axios from 'axios'

import { ICredentials } from '../redux/authToolkitRedux/StoreSlices/registration'

export const fetchRegistration = async (credentials: ICredentials) => {
  try {
    const response = axios.post('/api/auth/register', credentials)
    return response
  } catch (error) {
    throw new Error(error.message || 'Что-то пошло не так')
  }
}
