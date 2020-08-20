import axios from 'axios'
import { response } from 'express'

// export const getMemes = async function() {

//   const allMemes = await axios.get('/api/meme/getlist')

//   return allMemes
// }

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

export const likeMeme = (id: number) => {
  return axios
    .post('/api/meme/likememe', {
      id: id,
      email: JSON.parse(localStorage.getItem('userData')!).email,
    })
    .then((response) => console.log(response))
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
    .then((response) => console.log(response))
    .catch((error) => {
      throw new Error(error)
    })
}

// export const authLoginAxios = (credentials) => {
//   console.log('authLoginAxios credentials', credentials);
//   const instance = axios.create(config)
//   return instance
//     .post('/api/auth/login', JSON.stringify(credentials))
//       .then(response => {
//         console.log('authLoginAxios response', response.data);
//         return response.data
//       })
//       .catch(error => {
//         throw error
//       })
// }
