import { Router, Request, Response } from 'express'

import { Token } from '../models/Token'
import { User } from '../models/User'

const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authenticateToken = require('../middleware/auth.middleware')

const router = Router()

// Генерация токенов
const generateAccessToken = (userId: string) =>
  jwt.sign({ userId, type: 'access' }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  })

const generateRefreshToken = (userId: string) =>
  jwt.sign({ userId, type: 'refresh' }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  })

// заменяет refreshToken
const replaceDbRefreshToken = (tokenId: string, userId: string) => {
  return Token.findOneAndRemove({ userId })
    .exec()
    .then(() => Token.create({ tokenId, userId }))
}

// Генерация обоих токенов и обновление
const updateTokens = (userId: string) => {
  const accessToken = generateAccessToken(userId)
  const refreshToken = generateRefreshToken(userId)

  return replaceDbRefreshToken(refreshToken, userId).then(() => ({
    accessToken,
    refreshToken,
  }))
}

////////////////////////

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    try {
      console.log(req.body)
      const errors = validationResult(req)

      if (!errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        })
      }
      const { email, password } = req.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Такой плfeffeьзователь уже есть ' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()

      res.status(201).json({ user: { email } })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'что-то пошло не так, попробуйте снова' })
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему',
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json('Пользователь не найден')
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Неверный пароль, попробуйте снова' })
      }

      updateTokens(user._id.toString()).then((tokens: any) => {
        res.cookie('refresh_token', tokens.refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30,
        })

        return res.json({
          tokens: {
            access_token: tokens.accessToken,
          },
        })
      })
    } catch (e) {
      console.log('Error message: ', e.message)

      res.status(500).json({ message: 'что-то пошло не так, попробуйте снова' })
    }
  }
)

const refreshTokens = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token
  let payload
  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    console.log('payload: ', payload)

    if (payload.type !== 'refresh') {
      res.status(400).json({ message: 'Invalid token!' })
      return
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: 'Token expired!' })
      return
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: 'Invalid token!' })
      return
    }
  }

  Token.findOne({ tokenId: refreshToken })
    .exec()
    .then((token: any) => {
      if (token === null) {
        throw new Error('Invalid token!')
      }

      return updateTokens(token.userId).then((tokens: any) => {
        res.cookie('refresh_token', tokens.refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30,
        })

        return res.json({
          tokens: {
            access_token: tokens.accessToken,
          },
        })
      })
    })
    .catch((err: any) => res.status(400).json({ message: err.message }))
}

router.post('/refresh_tokens', authenticateToken, refreshTokens)

router.delete('/logout', async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refresh_token
    const { userId } = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )
    await Token.findOneAndRemove({ userId }).exec()
    res.cookie('refresh_token', '', { maxAge: 0 })
    res.sendStatus(204)
  } catch (error) {
    console.log('error: ', error)
  }
})

module.exports = router
