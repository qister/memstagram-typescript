import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
}

export const getMemes = async () => {
  const instance = axios.create(config)
  try {
    const { data } = await instance.get('/api/meme/getlist')
    return data
  } catch (error) {
    throw error
  }
}

export const likeMeme = async (id: number, email: string) => {
  try {
    await axios.post('/api/meme/likememe', {
      id,
      email,
    })
    // console.log('response: ', response)
  } catch (error) {
    throw new Error(error)
  }
}

export const uploadMeme = async (meme: any) => {
  try {
    const response = await axios.post('/api/meme/addpic', meme, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('upload response: ', response)
  } catch (error) {
    throw new Error(error)
  }
}
