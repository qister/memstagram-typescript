import { Collapse, Result } from 'antd'
import React from 'react'

interface IState {
  hasError: boolean
  message?: string
  stack?: string
}

interface IProps {
  children: React.ReactNode | string
}

export class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { hasError: false, message: '', stack: '' }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message, stack: error?.stack }
  }

  render() {
    const { hasError, message, stack } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <Result status="error" title="Что-то пошло не так" subTitle={message}>
          {stack && (
            <Collapse bordered={false}>
              <Collapse.Panel header="Показать ошибку" key="1">
                <code>{stack}</code>
              </Collapse.Panel>
            </Collapse>
          )}
        </Result>
      )
    }

    return children
  }
}
