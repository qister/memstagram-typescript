/* eslint-disable prettier/prettier */
// TODO переписать тесты нормально как в App.test.tsx
import { getByDisplayValue, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import '@testing-library/jest-dom/extend-expect'

import { LoginForm } from './Login'
import { authorization } from './authSlice'

//@ts-ignore
const renderWithRedux = (component, { initialState, store = createStore(combineReducers({ authorization })) } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>), store
  }
}

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => { },
      removeListener: () => { }
    };
  }
})

const handlers = [
  rest.post('/api/v1/auth/login', async (req, res, ctx) => {
    console.log('bobobo', req.body);

    return res(ctx.json({
      tokens: {
        access_token: 'testAccessToken',
      },
    }))
  })
]

const server = setupServer(...handlers)
// server.use(

// )


// rest.post('/api/v1/auth/login', (req, res, ctx) => {
//   console.log('bobobo', req.body);

//   return res(ctx.json({
//     tokens: {
//       access_token: 'testAccessToken',
//     },
//   }))
// })

describe('Форма логина', () => {

  beforeEach(() => server.listen())
  // afterEach(() => server.resetHandlers())
  afterEach(() => server.close())

  it('Пишешь имейл и значение поля меняется', () => {
    const { getByPlaceholderText } = renderWithRedux(<LoginForm />)
    const emailField = getByPlaceholderText(/email/i)

    userEvent.type(emailField, 'test@test.com')
    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument()
    // Или так, хз как лучше
    expect(emailField).toHaveValue('test@test.com')
  })

  it('Пишешь пароль и он меняется', () => {
    const { getByPlaceholderText } = renderWithRedux(<LoginForm />)
    const passwordField = getByPlaceholderText(/password/i)

    userEvent.type(passwordField, '123123')
    expect(passwordField).toHaveValue('123123')
  })

  it('Кнопка залогиниться задизейблена если не прошла валидация', async () => {
    const { getByPlaceholderText, getByRole } = renderWithRedux(<LoginForm />)
    const emailField = getByPlaceholderText(/email/i)
    const loginButton = getByRole('button')
    const passwordField = getByPlaceholderText(/password/i)

    userEvent.type(emailField, 'test@test.com')
    // const button = screen.queryByRole('button')
    // expect(await screen.findByRole('button')).toBeDisabled()
    await waitFor(() => expect(loginButton).toBeDisabled())
    // await waitFor(() => expect(loginButton).not.toBeDisabled())
    // await waitFor(() => expect(loginButton).toHaveProperty('disabled', true))

    userEvent.type(passwordField, '123123')
    await waitFor(() => expect(loginButton).toHaveProperty('disabled', false))
    // console.log(123, screen.debug())
  })

  it('Отправка запроса на логин', async () => {

    // server.use(rest.post('/api/v1/auth/login', (req, res, ctx) => {
    //   console.log('bobobo', req.body);

    //   return res(ctx.json({
    //     tokens: {
    //       access_token: 'testAccessToken',
    //     },
    //   }))
    // }))

    const { getByPlaceholderText, getByRole } = renderWithRedux(<LoginForm />)
    const emailField = getByPlaceholderText(/email/i)
    const loginButton = getByRole('button')
    const passwordField = getByPlaceholderText(/password/i)

    userEvent.type(emailField, 'test@test.com')
    // await waitFor(() => expect(loginButton).not.toBeDisabled())
    await waitFor(() => expect(loginButton).toBeDisabled())
    userEvent.type(passwordField, '123123')
    await waitFor(() => expect(loginButton).not.toBeDisabled())
    // await waitFor(() => expect(loginButton).not.toBeDisabled()) // Почему кейс не проходит?
    // await waitFor(() => expect(loginButton).toBeDisabled()) // почему кейс проходит?
    // await waitFor(() => expect(loginButton).not.toHaveAttribute('disabled'))
    // await waitFor(() => expect(loginButton).toHaveProperty('disabled', true))

    userEvent.click(loginButton)
    await waitFor(() => expect(loginButton).toBeDisabled())
    // await waitFor(() => expect(loginButton).not.toBeDisabled())
    await waitFor(() => expect(loginButton).toBeDisabled())
    // await waitFor(() => expect(loginButton).toHaveProperty('disabled', false))
    // await waitFor(() => expect(screen.findByRole('button')).not.toBeInTheDocument())
  })


})

// const loginEndPOint = jest.mockEndpoint()