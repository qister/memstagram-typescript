import { Request, Response, NextFunction } from 'express'

const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('../models/User')

const getUser = async (
  req: Request & any,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenId = req.headers.authorization.split(' ')[1]
    const { userId } = jwt.verify(tokenId, process.env.ACCESS_TOKEN_SECRET)
    // TODO поменять емейл на ник
    const user = await User.findOne({ _id: userId })
    req.user = user
    next()
  } catch (error) {
    // TODO добавить обработку что пользователь не найден
    console.log(error.message)
  }
}

module.exports = { getUser }
