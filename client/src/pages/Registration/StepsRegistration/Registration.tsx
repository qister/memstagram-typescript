import React from 'react'
import { Steps, Button, message } from 'antd';

import { Step1 } from './Steps/Step1';
import { Step2 } from './Steps/Step2';
import { Step3 } from './Steps/Step3';
import './Registration.scss'

const { Step } = Steps;

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

export const Registration = () => {
    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const ROOT_CLASS = 'registration'
    return (
        <div className={ROOT_CLASS}>
            <div className={`${ROOT_CLASS}__header`}>Регистрация</div>
            <Steps current={current}>
                {steps.map(item => (
                <Step key={item.title} />
                ))}
            </Steps>
            <div className="steps-content">
                {current === 0 &&
                    <Step1 />
                }
                {current === 1 &&
                    <Step2 />
                }
                {current === 2 &&
                    <Step3 />
                }
            </div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                    Next
                </Button>
                )}
                {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Done
                </Button>
                )}
                {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                    Previous
                </Button>
                )}
            </div>
        </div>
    )
}