import { notification } from 'antd'

export const successNotificate = (message?: string) => {
  notification.success({
    message: 'Успешно',
    description: message,
  })
}
