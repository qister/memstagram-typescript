import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
}

export const getMemes = () => {
  const instance = axios.create(config)
  return instance
    .get('/api/meme/getlist')
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export const likeMeme = (id: number, email: string) => {
  return axios
    .post('/api/meme/likememe', {
      id,
      email,
      // email: JSON.parse(localStorage.getItem('userData')!).email,
    })
    .then((response) => {
      console.log('response: ', response)
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export const uploadMeme = (meme: any) => {
  return axios
    .post('/api/meme/addpic', meme, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => console.log('upload: ', response))
    .catch((error) => {
      throw new Error(error)
    })
}
