import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './Login.scss'
import { useDispatch } from 'react-redux'
import { authLogin } from 'redux/authToolkitRedux/StoreSlices/authorization'

const { Link } = Typography

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

  const onSubmit = () => {
    const {email, password} = form.getFieldsValue()

    dispatch(authLogin({email, password}))
  }

  return (
    <div className={ROOT_CLASS}>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        form={form}
      >
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='email'
            onChange={onChangeForm}
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
            onChange={onChangeForm}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox onChange={onChangeForm}>Remember me</Checkbox>
          </Form.Item>
          {/* TODO добавить восстановление пароля */}
          <Link href=''>Forgot password</Link>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            disabled={!isValid}
            onClick={onSubmit}
          >
            Log in
          </Button>
          Or <Link href='/register'>register now</Link>
        </Form.Item>
      </Form>
    </div>
  )
}
