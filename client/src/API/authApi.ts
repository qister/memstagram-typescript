import { Credentials } from '../redux/authToolkitRedux/StoreSlices/authorization'

export function authLoginFetch(credentials: Credentials) {
    const request = async (url: any, method = 'GET', body: any, headers: any) => {
        try {
          // console.log('Headers', headers.headers['Content-Type'])
          
          if (body && (headers['Content-Type'] === 'application/json')) {
            body = JSON.stringify(body)
            // headers['Content-Type'] = 'application/json'
          }
  
          const response = await fetch(url, { method, body, headers })
          const data = await response.json()
  
          if (!response.ok) {
            throw new Error(data.message || 'Что-то пошло не так')
          }

          return data
        } catch (e) {
          throw e
        }
      }

    return request('/api/auth/login', 'POST', { ...credentials }, {'Content-Type': 'application/json'})
}