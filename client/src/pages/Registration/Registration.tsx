import React, { useEffect, useState } from 'react'
import { Form, Input, Tooltip, Button } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import './Registration.scss'
import { useDispatch, useSelector } from 'react-redux'
import { register } from 'redux/authToolkitRedux/StoreSlices/registration'
import { RootState } from 'redux/authToolkitRedux/StoreSlices'
import { IFetchingStatus } from 'constants/enums'
import { useHistory } from 'react-router'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const ROOT_CLASS = 'registration'

export const Registration = () => {
  const [form] = Form.useForm()
  const [isValid, setIsValid] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const { fetchingStatus } = useSelector(
    (state: RootState) => state.registration,
  )

  // TODO: вынести это в редюсер и убрать отсюда, надо глянуть как с роутингом внутри стора работать
  useEffect(() => {
    if (fetchingStatus === IFetchingStatus.fulfilled) {
      history.push('/login')
    }
  }, [fetchingStatus])

  const onSubmit = async () => {
    const { email, password } = form.getFieldsValue()
    dispatch(register({ email, password }))
  }

  const onChangeForm = () => {
    form
      .validateFields()
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false))
  }

  return (
    <div className={ROOT_CLASS}>
      <Form
        {...layout}
        form={form}
        name='register'
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name='email'
          label='E-mail'
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
        >
          <Input onChange={onChangeForm} />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password onChange={onChangeForm} />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
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
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                )
              },
            }),
          ]}
        >
          <Input.Password onChange={onChangeForm} />
        </Form.Item>

        <Form.Item
          name='nickname'
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title='What do you want others to call you?'>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          // TODO: добавить лайф проверку ника на уникальность
          // rules={[
          //   {
          //     required: true,
          //     message: 'Please input your nickname!',
          //     whitespace: true,
          //   },
          // ]}
        >
          <Input onChange={onChangeForm} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type='primary'
            htmlType='submit'
            onClick={onSubmit}
            disabled={!isValid}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
