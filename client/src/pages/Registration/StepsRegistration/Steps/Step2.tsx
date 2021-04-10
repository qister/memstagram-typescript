import React from 'react'
import { Form, Input, Button, Tooltip, Checkbox, Select } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { IStep } from '../Registration'

const { Option } = Select

export const Step2 = ({
    form,
    onChangeForm,
    normalizePhoneNumber,
    next,
    prev,
}: IStep) => {
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }}>
            <Option value="7">+7</Option>
          </Select>
        </Form.Item>
    );

    const onNextClick = () => {
        form
            .validateFields()
            .then(() => next())
            .catch(() => { return })
    }

    return (
        <>
            <Form.Item
                name='nickname'
                label={
                    <span>Nickname&nbsp;
                        <Tooltip title='What do you want others to call you?'>
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
            >
                <Input onChange={onChangeForm} />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: false, message: 'Please input your phone number!' }]}
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

            <Form.Item>
                <Button
                    type="primary"
                    onClick={onNextClick}
                    htmlType="submit"
                >
                    Дальше
                </Button>
            </Form.Item>

            <Form.Item>
                <Button style={{ margin: '0 8px' }} onClick={prev}>
                    Назад
                </Button>
            </Form.Item>
        </>
    )
}