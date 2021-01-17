import axios from 'axios'

import { Credentials } from '../redux/authToolkitRedux/StoreSlices/authorization'

export async function authLoginFetch(credentials: Credentials) {
  try {
    const { data } = await axios.post('/api/auth/login', credentials)
    return data
  } catch (error) {
    throw new Error(error.message || 'Что-то пошло не так')
  }
}
