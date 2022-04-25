import { useEffect, useState } from 'react'
import { Form, Input, Button, Row } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { useAuthContext } from 'auth'

import './Login.scss'

const ROOT_CLASS = 'login'

export const LoginForm = () => {
  const [form] = Form.useForm()
  const [isValid, setIsValid] = useState(false)

  const { login, isLoggingIn, initialCredentials } = useAuthContext()

  const onChangeForm = () => {
    form
      .validateFields()
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false))
  }

  useEffect(() => {
    if (initialCredentials) {
      form.setFieldsValue(initialCredentials)
      onChangeForm()
    }
  }, [])

  const onSubmit = () => {
    const { email, password } = form.getFieldsValue()
    login({ email, password })
  }

  const onTryDemo = () => {
    form.setFieldsValue({ email: 'test@test.com', password: '123123' })
    onSubmit()
  }

  return (
    <div className={ROOT_CLASS}>
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
            onChange={onChangeForm}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            autoComplete="on"
            type="password"
            placeholder="password"
            onChange={onChangeForm}
          />
        </Form.Item>
        {/* TODO вернуть когда можно будет запоминать сессию и восстанавливать пароль */}
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox onChange={onChangeForm}>Remember me</Checkbox>
          </Form.Item>
          
          <Link to="/forgot_pass">Forgot password</Link>
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={onSubmit}
            loading={isLoggingIn} // При loading={true} кнопка дизейблится через стили, но атрибут disabled не добавляется
            disabled={!isValid || isLoggingIn} // Поэтому тут она дополнительно дизейблится через || isLoading
          >
            Log in
          </Button>

          <Row justify="space-between">
            <Button type="link" htmlType="button">
              <Link to="/register">Register now</Link>
            </Button>
            <Button type="link" htmlType="button" onClick={onTryDemo}>
              Try demo
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </div>
  )
}
