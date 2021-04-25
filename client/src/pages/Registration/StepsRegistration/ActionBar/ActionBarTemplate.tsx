import React from 'react'
import { Button, Form } from 'antd'

import '../Registration.scss'

interface IActionBar {
  current: number
  tailLayout: any
  onPrevStepClick: () => void
  onNextStepClick: () => void
  onRegister: () => void
}

export const ActionBarTemplate = ({
  current,
  tailLayout,
  onPrevStepClick,
  onNextStepClick,
  onRegister,
}: IActionBar) => {
  return (
    <div className="steps-action">
      {current > 0 && (
        <Form.Item>
          <Button onClick={onPrevStepClick}>Назад</Button>
        </Form.Item>
      )}
      {current !== 2 && (
        <Form.Item {...tailLayout}>
          <Button type="primary" onClick={onNextStepClick} htmlType="submit">
            Дальше
          </Button>
        </Form.Item>
      )}
      {current === 2 && (
        <Form.Item>
          <Button
            style={{ marginLeft: '33px' }}
            type="primary"
            onClick={onRegister}
            htmlType="submit"
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      )}
    </div>
  )
}
