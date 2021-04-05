import { message } from 'antd'

import { axiosInstance } from './axios'

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

export const uploadMeme = async (data: FormData) => {
  try {
    const response = await axiosInstance.post('/api/meme/addpic', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('upload response: ', response)
    // TODO
    // Добавить обработку ошибок и успешных запросов, здесь ее лучше сделать или в компоненте?..
    message.success(`File uploaded successfully.`)
  } catch (error) {
    throw new Error(error)
  }
}
