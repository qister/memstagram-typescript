import { Router, Request, Response } from 'express'
import multer from 'multer'

import { IUser } from './../models/User'
import { Meme } from '../models/Meme'
const paginatedResults = require('../middleware/memes.middleware')
const authenticateToken = require('../middleware/auth.middleware')
const { getUser } = require('../middleware/user.middleware')

const router = Router()

router.get('/show', async (req: Request, res: Response) => {
  try {
    const meme = await Meme.find({ id: req.query.id })
    res.status(200).json(meme)
  } catch (e) {
    console.log('Error: ', e.message)
  }
})

router.get(
  '/getlist',
  [authenticateToken, getUser, paginatedResults(Meme)],
  async (req: Request & { user: IUser }, res: Response & any) => {
    const userId = req.user._id
    const filteredResults = {
      ...res.paginatedResults,
      memes: res.paginatedResults.memes.map((meme: any) => {
        return meme.likedBy.some(
          (id: any) => id.toString() === userId.toString()
        )
          ? { ...meme, liked: true }
          : { ...meme, liked: false }
      }),
    }

    res.status(200).json(filteredResults)
  }
)

router.get(
  '/user_memes',
  // TODO добавить пагинацию + можно совместить с запросом getlist через дополнительный параметр
  [authenticateToken, getUser],
  async (req: Request & { user: IUser }, res: Response & any) => {
    const userId = req.user._id
    try {
      // TODO убрать total когда будет пагинация
      const total = await Meme.find({ authorId: userId })
        .countDocuments()
        .exec()
      const userMemes = await Meme.find({ authorId: userId })

      res.json({ memes: userMemes, total })
    } catch (error) {
      console.log(error.message)
    }
  }
)

router.post(
  '/likememe',
  authenticateToken,
  getUser,
  async (req: Request & { user: IUser } & any, res: Response) => {
    try {
      const userId = req.user._id
      const memeId = req.body._id
      const memeBefore = await Meme.findById(memeId)

      if (memeBefore) {
        if (
          //TODO вынести это в отдельную константу и везде использовать
          memeBefore.likedBy.some((id) => id.toString() === userId.toString())
        ) {
          await Meme.findByIdAndUpdate(memeId, {
            likedBy: memeBefore.likedBy.filter(
              (id) => id.toString() !== userId.toString()
            ),
          })

          //TODO отправлять на фронт только нужные поля, а не все, что есть в меме
          const memeAfter = {
            ...memeBefore.toObject(),
            liked: false,
          }
          res.status(201).json({ meme: memeAfter })
        } else {
          await Meme.findByIdAndUpdate(memeId, {
            likedBy: [...memeBefore.likedBy, userId],
          })
          //TODO отправлять на фронт только нужные поля, а не все, что есть в меме
          const memeAfter = {
            ...memeBefore.toObject(),
            liked: true,
          }

          res.status(201).json({ meme: memeAfter })
        }
      }
    } catch (e) {
      console.log('Like error', e.message)
    }
  }
)

//addMemes

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({ storage, fileFilter })

router.post(
  '/addpic',
  authenticateToken,
  getUser,
  upload.array('memelist[][file]'),
  async (req: Request & any, res) => {
    try {
      // Пока не убирать, multer вставляет [Object: null prototype]. Может быть нужно потом для корректного парсинга body
      // https://stackoverflow.com/questions/54986409/why-request-body-is-null-in-file-upload-with-postman-in-node-js
      // const body = JSON.stringify(req.body, null, 2)
      // const trueBody = JSON.parse(body)

      const files = req.files as Express.Multer.File[]
      const description = req.body['memelist[][description]']
      const onlyOneMemeUploaded =
        typeof req.body['memelist[][description]'] === 'string'
      const descriptionList: string[] = onlyOneMemeUploaded
        ? [description]
        : [...description]
      const user = req.user

      const memeArray = descriptionList.map((description, index) => ({
        authorId: user._id,
        description,
        imgUrl: files[index].path,
        likedBy: [],
        created: new Date(),
      }))
      await Meme.insertMany(memeArray)

      return res.status(201).json({
        memes: memeArray,
      })
    } catch (error) {
      console.log('Add meme error', error)
      return res.status(400)
    }
  }
)

module.exports = router
