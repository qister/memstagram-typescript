import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/extend-expect'
import { App } from '.'
import { createMemoryHistory } from 'history'

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

    return res(ctx.status(400))

    // return res(
    //   ctx.json({
    //     tokens: {
    //       access_token: 'testAccessToken',
    //     },
    //   }),
    // )
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

// //@ts-ignore
// const renderWithReduxAndRouter = (
//   //@ts-ignore
//   component,
//   //@ts-ignore
// ) => {
//   return {
//     ...render(<Provider store={store}>{component}</Provider>),
//     store,
//   }
// }

// jest.setTimeout(30000)

describe('Приложение целиком', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers()) // нужно или нет?
  afterAll(() => server.close())

  it('После успешного логина показывается страница с лентой', async () => {
    const history = createMemoryHistory()
    render(<App />)
    const emailField = screen.getByPlaceholderText(/email/i)
    await userEvent.type(emailField, 'email@test.com', { delay: 20 })
    expect(screen.getByRole('button')).toBeDisabled()

    const passwordField = screen.getByPlaceholderText(/password/i)
    await userEvent.type(passwordField, 'password', { delay: 20 }) // Если пароль - один символ, то все ок, если больше то валидация не проходит, если не указать delay

    const loginbutton = await screen.findByRole('button')
    expect(loginbutton).toBeEnabled()
    userEvent.click(loginbutton)
    await screen.findByText('Лента')
  })
})
