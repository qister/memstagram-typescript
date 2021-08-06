import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Steps, Typography, Form } from 'antd'

import { Step1 } from './Steps/Step1'
import { Step2 } from './Steps/Step2'
import { Step3 } from './Steps/Step3'
import { ActionBar } from './ActionBar'
import { fetchRegistration } from 'redux/authToolkitRedux/StoreSlices/registration'
import './Registration.scss'

const { Step } = Steps
const { Title } = Typography

const steps = [
  {
    title: 'First',
  },
  {
    title: 'Second',
  },
  {
    title: 'Last',
  },
]

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export interface IStep {
  form?: any
  hidden: boolean
  theme?: string
  fileList?: any
  onChangeForm?: () => void
  toggleFile?: any
}

export const Registration = () => {
  const dispatch = useDispatch()

  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<any>([])

  console.log('Register fileList', fileList)
  console.log('Register form', form.getFieldsValue())

  const toggleFile = (newFileList: any) => {
    setFileList(newFileList)
  }

  const onNextClick = () => {
    if (current === 0) {
      form
        .validateFields(['email', 'password', 'confirm'])
        .then((data) => {
          console.log('validate data', data)

          setCurrent(current + 1)
        })
        .catch(() => {
          return
        })
    }

    if (current === 1) {
      form
        .validateFields(['nickname'])
        .then(() => setCurrent(current + 1))
        .catch(() => {
          return
        })
    }
  }

  const onPrevStepClick = () => {
    setCurrent(current - 1)
  }

  const onRegister = () => {
    const { email, password, nickname } = form.getFieldsValue()
    const file = fileList[0].originFileObj

    console.log('onRegister file', file)

    const data = {
      email,
      password,
      nickname,
      file,
    }

    dispatch(fetchRegistration(data))
  }

  const ROOT_CLASS = 'registration'
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__header`}>
        <Title>Регистрация</Title>
      </div>
      <Steps current={current} className={`${ROOT_CLASS}__steps`}>
        {steps.map((item) => (
          <Step
            key={item.title}
            // TODO дописать, чтобы можно было переходить на предыдущий шаг
            onClick={onNextClick}
          />
        ))}
      </Steps>
      <div className={`${ROOT_CLASS}__steps-content`}>
        <Form
          {...layout}
          name="register"
          form={form}
          initialValues={{
            prefix: '7',
          }}
          scrollToFirstError
        >
          <Step1
            // onChangeForm={onChangeForm}
            hidden={current !== 0}
          />
          <Step2
            // onChangeForm={onChangeForm}
            hidden={current !== 1}
          />
          <Step3
            hidden={current !== 2}
            form={form}
            theme="step_3"
            fileList={fileList}
            toggleFile={toggleFile}
          />
          <ActionBar
            tailLayout={tailLayout}
            current={current}
            onNextStepClick={onNextClick}
            onPrevStepClick={onPrevStepClick}
            onRegister={onRegister}
          />
        </Form>
      </div>
    </div>
  )
}
