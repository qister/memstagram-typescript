import React from 'react'
import { Form, Input, Button, Tooltip } from 'antd'

import { IStep } from '../Registration'

export const Step1 = ({
    form,
    tailLayout,
    onChangeForm,
    next,
}: IStep) => {

    const onNextClick = () => {
        form
            .validateFields()
            .then(() => next())
            .catch(() => { return })
    }

    return (
        <>
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
                <Input
                    onChange={onChangeForm}
                    style={{ width: '100%' }}
                />
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
                <Input.Password
                    onChange={onChangeForm}
                    style={{ width: '100%' }}
                />
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
                <Input.Password
                    onChange={onChangeForm}
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button
                    type="primary"
                    onClick={onNextClick}
                    htmlType="submit"
                >
                    Дальше
                </Button>
            </Form.Item>
        </>
    )
}