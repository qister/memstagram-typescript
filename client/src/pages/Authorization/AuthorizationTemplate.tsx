import React from 'react'
import { Typography, Button } from 'antd';

import './Authorization.scss'

interface Props {
  changeHandler(event: React.ChangeEvent<HTMLInputElement>): void
  loginHandler( event: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>): void
}

const { Title } = Typography;

export function AuthorizationTemplate({
  changeHandler,
  loginHandler,
}: Props): JSX.Element {

  const ROOT_CLASS = 'authorization'
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__title-container`}>
        <Title level={2}>Welcome to Memestagram</Title>
      </div>
      <div className={`${ROOT_CLASS}__input-field`}>
        <Title level={4}>Email</Title>
        <input
          placeholder="Введите email"
          id="email"
          type="text"
          name="email"
          className="dscsdc"
          onChange={changeHandler}
        />
      </div>
      <div className={`${ROOT_CLASS}__input-field`}>
        <Title level={4}>Password</Title>
        <input
          placeholder="Введите пароль"
          id="password"
          type="password"
          name="password"
          className=""
          onChange={changeHandler}
        />
      </div>
      <Button type='primary' onClick={loginHandler}>Войти</Button>
      {/* <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button> */}
    </div>
  )
}
