import { Router, Request, Response } from 'express'

const authenticateToken = require('../middleware/auth.middleware')
const { getUser } = require('../middleware/user.middleware')

const router = Router()

router.get(
  '/info',
  authenticateToken,
  getUser,
  async (req: Request & any, res: Response) => {
    try {
      // TODO отдавать в юзере только то, что нужно фронту (без _id, _v итд)
      res.status(201).json({ user: req.user })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'что-то пошло не так, попробуйте снова' })
    }
  }
)

module.exports = router
