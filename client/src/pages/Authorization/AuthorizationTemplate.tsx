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

  const [xAxis, setXAxis] = useState<number>()
  const [yAxis, setYAxis] = useState<number>()

  function mouseMove(e: React.MouseEvent<HTMLElement>) {
    let xAxis_ = (window.innerWidth / 2 - e.pageX) / 8
    let yAxis_ = (window.innerHeight / 2 - e.pageY) / 8
    setXAxis(xAxis_)
    setYAxis(yAxis_)
  }

  function mouseLeave(e: React.MouseEvent<HTMLElement>) {

  }

  const titleContainerStyle = {
    transform: `rotateY(${yAxis}deg) rotateX(${xAxis}deg)`
  }

  const titleStyle = {
    transform: 'translateZ(150px)'
  }

  const ROOT_CLASS = 'authorization'
  return (
    <div className={ROOT_CLASS}>
      <div
        className={`${ROOT_CLASS}__title-container`}
        onMouseMove={mouseMove}
        onMouseLeave={mouseLeave}
        style={titleContainerStyle}
      >
        <div className="title" style={titleStyle} >WELCOM TO MEMESTAGRAM</div>
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
