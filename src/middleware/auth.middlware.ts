import { Request, Response, NextFunction } from 'express'

const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req: any, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        const token = req.headers.authorization!.split(' ')[1] // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({message: 'Нет авторизации'})
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()

    }  catch {
        return res.status(401).json({message: 'Нет авторизации'})
    }
}