import { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, Row } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './Login.scss'
import { fetchLogin } from './authSlice'
import { RootState } from 'redux/store'
import { IFetchingStatus } from 'constants/enums'

const ROOT_CLASS = 'login'

export const LoginForm = () => {
  const [form] = Form.useForm()
  const [isValid, setIsValid] = useState(false)

  const dispatch = useDispatch()

  const onChangeForm = () => {
    form
      .validateFields()
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false))
  }

  const { fetchingStatus, loginCredentials } = useSelector(
    (state: RootState) => state.authorization,
  )

  useEffect(() => {
    if (loginCredentials) {
      form.setFieldsValue(loginCredentials)
      onChangeForm()
    }
  }, [])

  const onSubmit = () => {
    const { email, password } = form.getFieldsValue()
    dispatch(fetchLogin({ email, password }))
  }

  const onTryDemo = () => {
    form.setFieldsValue({ email: 'test@test.com', password: '123123' })
    onSubmit()
  }

  const isLoading = fetchingStatus === IFetchingStatus.pending

  return (
    <div className={ROOT_CLASS}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        form={form}
      >
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
            loading={isLoading} // При loading={true} кнопка дизейблится через стили, но атрибут disabled не добавляется
            disabled={!isValid || isLoading} // Поэтому тут она дополнительно дизейблится через || isLoading
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
