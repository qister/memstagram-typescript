import axios from 'axios'

import { ICredentials } from '../redux/authToolkitRedux/StoreSlices/authorization'

export const fetchLogin = async (credentials: ICredentials) => {
  try {
    const { data } = await axios.post('/api/auth/login', credentials)
    return data
  } catch (error) {
    throw new Error(error.message || 'Что-то пошло не так')
  }
}

export async function logoutFetch() {
  console.log('logoutFetch')

  try {
    return await axios.delete('/api/auth/logout')
  } catch (error) {
    console.error(error.message || 'Не удалось выйти')
  }
}
