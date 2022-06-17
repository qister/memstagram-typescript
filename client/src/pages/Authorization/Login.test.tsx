import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/extend-expect'

import { LoginForm } from './Login'
import { renderWithRouter } from 'utils/testUtils'

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    }
  },
})

const handlers = [
  rest.post('/api/v1/auth/login', async (req, res, ctx) => {
    console.log('bobobo', req.body)

    return res(
      ctx.json({
        tokens: {
          access_token: 'testAccessToken',
        },
      }),
    )
  }),
]

const server = setupServer(...handlers)

describe('Форма логина', () => {
  beforeEach(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterEach(() => server.close())

  it('Пишешь имейл и значение поля меняется', async () => {
    renderWithRouter(<LoginForm />, { initialRoute: '/login', componentPath: '/login' })

    const emailField = screen.getByPlaceholderText(/email/i)

    await userEvent.type(emailField, 'test@test.com', { delay: 20 })
    expect(emailField).toHaveValue('test@test.com')
  })

  it('Пишешь пароль и он меняется', async () => {
    renderWithRouter(<LoginForm />, { initialRoute: '/login', componentPath: '/login' })

    const passwordField = screen.getByPlaceholderText(/password/i)

    await userEvent.type(passwordField, '123123', { delay: 20 })
    expect(passwordField).toHaveValue('123123')
  })

  it('Кнопка залогиниться задизейблена если не прошла валидация', async () => {
    renderWithRouter(<LoginForm />, { initialRoute: '/login', componentPath: '/login' })
    const emailField = screen.getByPlaceholderText(/email/i)
    const loginButton = screen.getByRole('button', { name: 'Log in' })
    const passwordField = screen.getByPlaceholderText(/password/i)

    await userEvent.type(emailField, 'test@test.com', { delay: 20 })
    await waitFor(() => expect(loginButton).toBeDisabled())

    await userEvent.type(passwordField, '123123', { delay: 20 })
    await waitFor(() => expect(loginButton).toBeEnabled())
  })

  it('Отправка запроса на логин', async () => {
    renderWithRouter(<LoginForm />, { initialRoute: '/login', componentPath: '/login' })
    const emailField = screen.getByPlaceholderText(/email/i)
    const loginButton = screen.getByRole('button', { name: 'Log in' })
    const passwordField = screen.getByPlaceholderText(/password/i)

    await userEvent.type(emailField, 'test@test.com', { delay: 20 })
    await waitFor(() => expect(loginButton).toBeDisabled())
    await userEvent.type(passwordField, '123123', { delay: 20 })
    await waitFor(() => expect(loginButton).toBeEnabled())

    // Вернуть
    // userEvent.click(loginButton)
    // await waitFor(() => expect(loginButton).toBeDisabled())
    //TODO добавить проверку что апишка вызвалась
  })
})
