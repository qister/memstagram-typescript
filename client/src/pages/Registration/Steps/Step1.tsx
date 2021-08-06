import { Form, Input } from 'antd'

import { IStep } from '../Registration'

export const Step1 = ({ hidden }: IStep) => {
  const ROOT_CLASS = 'step'
  return (
    <div className={ROOT_CLASS}>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
        hidden={hidden}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
        hidden={hidden}
      >
        <Input.Password style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'))
            },
          }),
        ]}
        hidden={hidden}
      >
        <Input.Password style={{ width: '100%' }} />
      </Form.Item>
    </div>
  )
}
