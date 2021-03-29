import { message } from 'antd'
import axios from 'axios'
import { getAccessTokenFromCookie } from 'utils/auth'

const tokenFromCookie = getAccessTokenFromCookie()
const token = tokenFromCookie ?? ''

const axiosInstance = axios.create({
  headers: {
    // TODO не хранить access_token в куках, перейти на другое хранилище 
    Authorization: 'Bearer ' + token,
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

export const uploadMeme = async (data: FormData) => {
  try {
    // TODO: добавить axiosInstance чтобы подставлялся хедер с авторизацией
    const response = await axios.post('/api/meme/addpic', data, {
      headers: {
        Authorization: 'Bearer ' + token,
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
