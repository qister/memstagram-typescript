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

export async function logoutFetch() {
  console.log('logoutFetch');
  
  try {
    return await axios.delete('/api/auth/logout')
  } catch (error) {
    throw new Error(error.message || 'Не удалось выйти')
  }
}
