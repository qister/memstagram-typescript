import React, { useState } from 'react'
import './Authorization.scss'

interface Props {
  changeHandler(event: React.ChangeEvent<HTMLInputElement>): void
  loginHandler( event: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>): void
}

export function AuthorizationTemplate({
  changeHandler,
  loginHandler,
}: Props): JSX.Element {

  const ROOT_CLASS = 'authorization'
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__title-container`}>
        <div className="title">WELCOM TO MEMESTAGRAM</div>
      </div>
      <div className={`${ROOT_CLASS}__input-field`}>
        <label htmlFor="email">Email</label>
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
        <label htmlFor="password">Пароль</label>
        <input
          placeholder="Введите пароль"
          id="password"
          type="password"
          name="password"
          className=""
          onChange={changeHandler}
        />
      </div>
      <button
        className={`${ROOT_CLASS}__input-button`}
        onClick={loginHandler}
      >
        Войти
      </button>
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
