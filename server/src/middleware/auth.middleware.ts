import { Request, Response, NextFunction } from 'express'

require('dotenv').config()

const jwt = require('jsonwebtoken')

const authenticateToken = (
  req: Request & any,
  res: Response,
  next: NextFunction
) => {
  // TODO перейти на токен в хедере
  // 
  // const authHeader = req.headers['authorization']
  // const token = authHeader && authHeader.split(' ')[1]
  const token = req.cookies.access_token
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403)

    next()
  })
}

module.exports = authenticateToken
