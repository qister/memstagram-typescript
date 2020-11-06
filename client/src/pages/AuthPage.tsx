import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = (props: any) => {
  const { setUser } = props

  const auth = useContext(AuthContext)

  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()

  type Form = {
    email: string
    password: string
  }

  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
  })

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form }, {'Content-Type': 'application/json'})
    } catch (e) {
      console.log('Register error: ', e.message)
      
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form }, {'Content-Type': 'application/json'})
      console.log('Auth Data', data);
      
      if (data.token) {
        auth.login(data.token, data.userId, data.email)
        setUser(data.email)
        // setCurrentUser(data.email)

        // props.authLoginAction({...form})
      }
    } catch (e) {
      console.log('Error', e.message)
    }
  }

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
