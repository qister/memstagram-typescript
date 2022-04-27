import { type AxiosError } from 'axios'
import { notification } from 'antd'

// message field comes from backend
export const errorNotificate = (error: AxiosError<{ message: string } & any>) => {
  const responseStatus = error?.response?.status
  let errorMsg = ''

  if (responseStatus) {
    //TODO Добавить переводы
    errorMsg = `error status ${responseStatus}, ${error.response?.data.message}`
    const t = error.response?.data
  } else {
    errorMsg = error.message || 'unexpected error'
  }

  notification.error({
    message: 'Error',
    description: errorMsg,
  })
}
