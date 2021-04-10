import React from 'react'
import { Button, message, Form } from 'antd';

interface IActionBar {
    prev: () => void
}

export const ActionBarTemplate = ({
    prev,
}: IActionBar) => {
    return (
        <div className="steps-action">
            <>
                <Button
                    type="primary"
                    onClick={() => message.success('Processing complete!')}
                    htmlType="submit"
                >
                    Зарегистрироваться
                </Button>
                <Button style={{ margin: '0 8px' }} onClick={prev}>
                    Назад
                </Button>
            </>
        </div>
    )
}