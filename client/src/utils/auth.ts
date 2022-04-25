export const getAccessTokenFromCookie = () => {
  const allCookies = document.cookie.split(';')

  for (const c of allCookies) {
    const [name, value] = c.split('=')
    if (name.trim() === 'access_token') {
      return value
    }
  }
}

const TOKEN_LIFETIME = 60 * 15 // 15 минут

export const setAccessTokenToCookie = (accessToken: string) => {
  document.cookie = `access_token=${accessToken};max-age=${TOKEN_LIFETIME}`
}

export const deleteAccessTokenFromCookie = () => {
  document.cookie = 'access_token=null;max-age=0'
}
