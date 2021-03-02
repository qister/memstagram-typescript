import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'

import { AuthForm } from '../../constants/types'
import './Authorization.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

interface Props {
  form: AuthForm
  changeHandler(event: React.ChangeEvent<HTMLInputElement>): void
  loginHandler(
    event: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>,
  ): void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export function AuthorizationTemplate({
  form,
  changeHandler,
  loginHandler,
}: Props): JSX.Element {
  const { email, password } = form

  console.log('AuthorizationTemplate email', email)
  console.log('AuthorizationTemplate password', password)

  const ROOT_CLASS = 'authorization'
  return (
    <div className={ROOT_CLASS}>
      <Form {...layout} name='basic' initialValues={{ remember: true }}>
        <Form.Item name='email' getValueFromEvent={changeHandler}>
          {/* <Input name='email' defaultValue={email} /> */}
          <Input
            name='email'
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>

        <Form.Item name='password' getValueFromEvent={changeHandler}>
          {/* <Input.Password name='password' defaultValue={password} /> */}
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
            name='password'
            defaultValue={password}
          />
        </Form.Item>

        <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href=''>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' onClick={loginHandler}>
            Log in
          </Button>
        </Form.Item>
      </Form>

      {/* <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button> */}
    </div>
  )
}
