import React, { useState } from 'react'
import { 
    Steps,
    Typography,
    Form,
} from 'antd';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import { Step1 } from './Steps/Step1';
import { Step2 } from './Steps/Step2';
import { Step3 } from './Steps/Step3';
import { ActionBar } from './ActionBar';
import './Registration.scss'

const { Step } = Steps;
const { Title } = Typography;


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
];

const layout = {
    wrapperCol: { span: 16 },
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

export interface IStep {
    tailLayout?: any, // { offset: number, span: number } TODO ругается, посмотреть
    form: any
    hasPhone?: boolean,
    togglePhone?: () => void
    onChangeForm?: () => void
    normalizePhoneNumber?: (value: string) => void
    next: () => void
    prev?: () => void
}

export const Registration = () => {
    const [current, setCurrent] = useState(0);
    const [hasPhone, setIsPhone] = useState(false);
    const [form] = Form.useForm()

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onChangeForm = () => {
        console.log('Registration form', form.getFieldsValue());
    };

    const togglePhone = () => {
        setIsPhone(!hasPhone)
    }

    const normalizePhoneNumber = (value: string) => {
        if (value) {
            const phoneNumber = parsePhoneNumberFromString(value, 'RU')
            if (!phoneNumber) {
                return value
            }

            return (
                phoneNumber.formatInternational()
            )
        } else {
            return
        }
    }

    const ROOT_CLASS = 'registration'
    return (
        <div className={ROOT_CLASS}>
            <div className={`${ROOT_CLASS}__header`}>
                <Title>Регистрация</Title>
            </div>
            <Steps current={current} className={`${ROOT_CLASS}__steps`}>
                {steps.map(item => (
                <Step key={item.title} />
                ))}
            </Steps>
            <div className={`${ROOT_CLASS}__steps-content`}>
                <Form
                    {...layout}
                    name='register'
                    form={form}
                    initialValues={{
                        residence: ['zhejiang', 'hangzhou', 'xihu'],
                        prefix: '7',
                    }}
                    scrollToFirstError
                >
                    {current === 0 &&
                        <Step1
                            tailLayout={tailLayout}
                            form={form}
                            onChangeForm={onChangeForm}
                            next={next}
                        />
                    }
                    {current === 1 &&
                        <Step2
                            form={form}
                            next={next}
                            prev={prev}
                            hasPhone={hasPhone}
                            togglePhone={togglePhone}
                            onChangeForm={onChangeForm}
                            normalizePhoneNumber={normalizePhoneNumber}
                        />
                    }
                    {current === 2 &&
                        <Step3
                            form={form}
                            next={next}
                        />
                    }
                    {current === steps.length - 1 && (
                        <ActionBar
                            prev={prev}
                        />
                    )}
                </Form>
            </div>
        </div>
    )
}