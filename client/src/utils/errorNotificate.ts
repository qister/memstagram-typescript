import { AxiosError } from 'axios'
import { notification } from 'antd'

export const errorNotificate = (error: AxiosError) => {
  console.log(234, error)
  const responseStatus = error?.response?.status
  let errorMsg = ''

  if (responseStatus) {
    //TODO Добавить переводы
    errorMsg = `error status ${responseStatus}, ${error?.response?.data.message}`
  } else {
    errorMsg = error.message || 'unexpected error'
  }

  notification.error({
    message: 'Error',
    description: errorMsg,
  })
}
