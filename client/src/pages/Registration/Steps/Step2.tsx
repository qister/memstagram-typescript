import { useState } from 'react'
import { Form, Input, Tooltip, Select } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import { IStep } from '../Registration'

const { Option } = Select

export const Step2 = ({ hidden }: IStep) => {
  const [hasPhone, setIsPhone] = useState(false)

  const togglePhone = () => {
    setIsPhone(!hasPhone)
  }

  const normalizePhoneNumber = (value: string) => {
    if (value) {
      const phoneNumber = parsePhoneNumberFromString(value, 'RU')
      if (!phoneNumber) {
        return value
      }

      return phoneNumber.formatInternational()
    } else {
      return
    }
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="7">+7</Option>
      </Select>
    </Form.Item>
  )
  const ROOT_CLASS = 'step'
  return (
    <div className={ROOT_CLASS}>
      <Form.Item
        name="nickname"
        label={
          <span>
            Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
        hidden={hidden}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: false, message: 'Please input your phone number!' }]}
        hidden={hidden}
      >
        <Input
          addonBefore={prefixSelector}
          style={{ width: '100%' }}
          // TODO
          // onChange={(e: any) => {
          //     e.target.value = normalizePhoneNumber(e.target.value)
          // }}
        />
      </Form.Item>
    </div>
  )
}
