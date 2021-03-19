import { Router, Request, Response } from 'express'
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Token = require('../models/Token')

const router = Router()

// Генерация токенов ///
const generateAccessToken = (userId: any) => {
  console.log('generateAccessToken')

  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '2m',
  })
}

const generateRefreshToken = (userId: any) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '3m',
  })
}

// заменяет refreshToken
const replaceDbRefreshToken = (tokenId: any, userId: any) => {
  return Token.findOneAndRemove({ userId })
    .exec()
    .then(() => Token.create({ tokenId, userId }))
}

// Генерация обоих токенов и обновление
const updateTokens = (userId: any) => {
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

      res.status(201).json({ message: 'Пользователь создан' })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'что-то пошло не так, попробуйте снова' })
    }
  }
)

// let refreshTokens: any[] = []

// router.post('/token', (req: Request, res: Response) => {
//   const refreshToken = req.body.token
//   console.log('/postToken refreshToken from body', refreshToken);

//   if (refreshToken === null) return res.sendStatus(401)
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, user: any) => {
//     if (err) return res.sendStatus(403)
//     const accessToken = generateAccessToken(user)
//     res.json({ accessToken })
//   })
// })

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
      console.log(user)

      if (!user) {
        return res.status(400).json('Пользователь не найден')
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Неверный пароль, попробуйте снова' })
      }

      // как было раньше
      // const accessToken = generateAccessToken(user.id)
      // const refreshToken = generateRefreshToken(user.id)
      // refreshTokens.push(refreshToken)
      // res.json({ accessToken, refreshToken, userId: user.id, email: user.email })

      // как сейчас
      updateTokens(user.id).then((tokens: any) => {
        console.log('updateTokens tokens', tokens)

        return res.json(tokens)
      })
    } catch (e) {
      console.log('Error message: ', e.message)

      res.status(500).json({ message: 'что-то пошло не так, попробуйте снова' })
    }
  }
)

const refreshTokens = (req: Request, res: Response) => {
  const { refreshToken } = req.body
  let payload
  try {
    payload = jwt.verify(refreshToken)
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

  Token.findOne({ tokenId: payload.id })
    .exec()
    .then((token: any) => {
      if (token === null) {
        throw new Error('Invalid token!')
      }

      return updateTokens(token.userId)
    })
    .then((tokens: any) => res.json(tokens))
    .catch((err: any) => res.status(400).json({ message: err.message }))
}

// как сейчас
router.post('/refreshTokens', refreshTokens)

// как было
// router.delete('/logout', (req: Request, res: Response) => {

//   console.log('route logout');

//   refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//   res.sendStatus(204)
// })

module.exports = router
