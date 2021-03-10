import { Router, Request, Response } from 'express'
// const { Router } = require('express')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const router = Router()

const generateAccessToken = (user: any) => {
  console.log('generateAccessToken');
  
  return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15s',
  })
}

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

let refreshTokens: any[] = []

router.post('/token', (req: Request, res: Response) => {
  const refreshToken = req.body.token
  console.log('/postToken refreshToken from body', refreshToken);
  

  if (refreshToken === null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken(user)
    res.json({ accessToken })
  })
})
 
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

      const accessToken = generateAccessToken(user)
      const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET)
      refreshTokens.push(refreshToken)

      console.log('refreshTokens arr', refreshTokens);

      console.log('/postLogin accessToken', accessToken);
      console.log('/postLogin refreshToken', refreshToken);

      res.json({ accessToken, refreshToken, userId: user.id, email: user.email })
    } catch (e) {
      console.log('Error message: ', e.message)

      res.status(500).json({ message: 'что-то пошло не так, попробуйте снова' })
    }
  }
)

router.delete('/logout', (req: Request, res: Response) => {

  console.log('route logout');
  
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

module.exports = router
