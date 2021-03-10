import axios from 'axios'

const axiosInstance = axios.create({
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    // TODO: контент тайп потом убрать из инстанса и передавать только где нужно
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

export const getMemes = async (page = 1) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/meme/getlist?page=${page}&limit=2`,
    )
    return data
  } catch (error) {
    throw error
  }
}

export const likeMeme = async (id: number) => {
  try {
    await axiosInstance.post('/api/meme/likememe', { id })
  } catch (error) {
    throw new Error(error)
  }
}

export const uploadMeme = async (meme: any) => {
  try {
    // TODO: добавить axiosInstance чтобы подставлялся хедер с авторизацией
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
