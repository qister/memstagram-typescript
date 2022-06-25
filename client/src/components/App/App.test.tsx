import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/extend-expect'

import { App } from './App'
import { renderWithRouter } from 'utils/testUtils'
import { deleteAccessTokenFromCookie } from 'utils/auth'

// Правка чтобы не было ворнингов в консоли во время валидации формы
import Schema from 'async-validator'
global.ResizeObserver = require('resize-observer-polyfill')
Schema.warning = function () {}

const testCredentials = {
  email: 'test@test.com',
  password: 'testtest',
}

const handlers = [
  rest.post('/api/v1/auth/login', (req, res, ctx) => {
    console.log('login', req.body)

    return res(
      ctx.json({
        tokens: {
          access_token: 'testAccessToken',
        },
      }),
    )
  }),
  rest.post('/api/v1/auth/refresh_tokens', (req, res, ctx) => {
    console.log('refresh_tokens', req.body)

    return res(
      ctx.json({
        tokens: {
          access_token: 'testAccessToken',
        },
      }),
    )
  }),
  rest.get('/api/v1/memes/list', (req, res, ctx) => {
    console.log('memelist', req.body)

    return res(
      ctx.json({
        next: {
          page: 2,
          limit: 2,
        },
        previous: {
          page: 1,
          limit: 2,
        },
        total: 126,
        memes: [
          {
            authorId: '5fa1c20446d1b111d6add6ae',
            categories: [],
            created: '2021-04-20T14:08:26.618Z',
            description: 'test',
            imgUrl: 'public/images/1618927706604-image_2021-04-08_16-45-16.png',
            liked: true,
            likedBy: ['5fa1c20446d1b111d6add6ae'],
            __v: 0,
            _id: '607ee05a20cff60d9ef46836',
          },
          {
            authorId: '5fa1c20446d1b111d6add6ae',
            categories: ['school', 'surrealistic'],
            created: '2021-05-17T17:52:40.370Z',
            description: 'test',
            imgUrl: 'public/memes/1621273960363-шт.jpg',
            liked: true,
            likedBy: ['5fa1c20446d1b111d6add6ae'],
            __v: 0,
            _id: '60a2ad68d77d0f2d2b9058f0',
          },
        ],
      }),
    )

    // return res(
    //   ctx.json({
    //     tokens: {
    //       access_token: 'testAccessToken',
    //     },
    //   }),
    // )
  }),
  rest.get('/api/v1/users/info', (req, res, ctx) => {
    console.log('user info', req.body)

    return res(
      ctx.json({
        user: {
          email: '5@gmail.com',
          password: '$2b$12$Uw7DYhqQIsk53PtRRhDjleq0CocGpHFvb7XefGOw3OE3XeaSSEava',
          userMemes: [],
          __v: 0,
          _id: '5fa1c20446d1b111d6add6ae',
        },
      }),
    )
  }),
  rest.post('/api/v1/auth/registration', (req, res, ctx) => {
    console.log('registration', req.body)

    return res(
      ctx.json({
        user: {
          _id: '613be162feae4900fe86b9fd',
          email: 'ttt@t.com',
          password: '$2b$05$xiEdgvcQCoIsJmp4uShPiOvD7baeM99mrP.cCH8.2cGva/9wi53..',
          __v: 0,
        },
      }),
    )
  }),
]

const server = setupServer(...handlers)

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    }
  },
})

jest.setTimeout(30000)

describe('Приложение целиком', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    deleteAccessTokenFromCookie()
  })
  afterAll(() => server.close())

  test('После успешного логина показывается страница с лентой', async () => {
    const { history } = renderWithRouter(<App />, { initialRoute: '/' })
    const emailField = screen.getByPlaceholderText(/email/i)
    await userEvent.type(emailField, testCredentials.email, { delay: 20 })
    expect(screen.getByRole('button', { name: 'Log in' })).toBeDisabled()
    await waitFor(() => expect(history.location.pathname).toEqual('/login'))
    const passwordField = screen.getByPlaceholderText(/password/i)
    await userEvent.type(passwordField, testCredentials.password, { delay: 20 }) // Если пароль - один символ, то все ок, если больше то валидация не проходит, если не указать delay

    const loginbutton = await screen.findByRole('button', { name: 'Log in' })
    expect(loginbutton).toBeEnabled()

    await userEvent.click(loginbutton)
    await waitFor(() => expect(loginbutton).toBeDisabled())
    // TODO добавить проверку на вызов апи
    await waitFor(() => expect(history.location.pathname).toEqual('/feed'))
    expect(screen.getByText('Лента')).toBeInTheDocument()
  })

  test('После успешной регистрации данные попадают в форму логина', async () => {
    const { history } = renderWithRouter(<App />, { initialRoute: '/register' })
    await userEvent.type(screen.getByPlaceholderText('email'), testCredentials.email, {
      delay: 20,
    })
    await userEvent.type(screen.getByPlaceholderText('password'), testCredentials.password, {
      delay: 20,
    })
    await userEvent.type(
      screen.getByPlaceholderText('confirm password'),
      testCredentials.password,
      {
        delay: 20,
      },
    )

    await waitFor(() => expect(screen.getByRole('button', { name: 'Register' })).toBeEnabled())
    await userEvent.click(screen.getByRole('button', { name: 'Register' }))
    await waitFor(() => expect(history.location.pathname).toEqual('/login'))

    // Тут await тк ждем пока асинхронно засеттятся значения в форму
    await waitFor(() =>
      expect(screen.getByPlaceholderText(/email/i)).toHaveValue(testCredentials.email),
    )
    await waitFor(() =>
      expect(screen.getByPlaceholderText(/password/i)).toHaveValue(testCredentials.password),
    )
    await waitFor(() => expect(screen.getByRole('button', { name: 'Log in' })).toBeEnabled())
  })
})
