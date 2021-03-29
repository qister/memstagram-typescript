import { Router, Request, Response } from 'express'
import multer, { ErrorCode } from 'multer'
const jwt = require('jsonwebtoken')

const Meme = require('../models/Meme')
const paginatedResults = require('../middleware/memes.middleware')
const authenticateToken = require('../middleware/auth.middleware')
const User = require('../models/User')

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
  [authenticateToken, paginatedResults(Meme)],
  async (req: any, res: any) => {
    res.json(res.paginatedResults)
  }
)

router.post(
  '/likememe',
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      // TODO этот блок вынести в милдвэр тк юзер почти везде нужен
      const tokenId = req.headers.authorization?.split(' ')[1]
      const { userId } = jwt.verify(tokenId, process.env.ACCESS_TOKEN_SECRET)
      const user = await User.find({ _id: userId })
      ///
      const { email } = user
      const { id } = req.body
      if (id >= 0) {
        const memeBefore = await Meme.findOne({ id })
        // TODO: сделать чтобы лайки были массивом id или юзернеймов, т.к. почту можно поменять и в целом не очень хорошо на клиент передавать список почт
        if (memeBefore.likedBy.some((user: string) => user === email)) {
          await Meme.updateOne(
            { id },
            {
              likedBy: memeBefore.likedBy.filter(
                (user: string) => user !== email
              ),
            }
          )
          res.status(201).json(`Meme with id ${id} was disliked`)
        } else {
          await Meme.updateOne(
            { id },
            { likedBy: [...memeBefore.likedBy, email] }
          )
          res.status(201).json(`Meme with id ${id} was liked`)
        }
      } else {
        throw new Error('unable to like meme')
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

router.post('/addpic', upload.array('memelist[][file]'), async (req, res) => {
  try {
    // Пока не убирать, multer вставляет [Object: null prototype]. Может быть нужно потом для корректного парсинга body
    // https://stackoverflow.com/questions/54986409/why-request-body-is-null-in-file-upload-with-postman-in-node-js
    // const body = JSON.stringify(req.body, null, 2)
    // const trueBody = JSON.parse(body)

    const files = req.files as Express.Multer.File[]
    const description = req.body['memelist[][description]']
    const onlyOneMemeUploaded =
      typeof req.body['memelist[][description]'] === 'string'
    const descriptionList = onlyOneMemeUploaded
      ? [description]
      : [...description]
    const total = await Meme.countDocuments().exec()
    // TODO этот блок вынести в милдвэр тк юзер почти везде нужен
    const tokenId = req.headers.authorization?.split(' ')[1]
    const { userId } = jwt.verify(tokenId, process.env.ACCESS_TOKEN_SECRET)
    // TODO поменять емейл на ник
    const user = await User.findOne({ _id: userId })
    console.log('user: ', user);
    
    //

    const memeArray = descriptionList.map((description: string, i: number) => ({
      //TODO избавится от использования id
      id: total + i,
      //TODO добавлять просто id юзера или посмотреть лучшие практики как лучше делать
      author: user.email,
      description,
      imgUrl: files[i].path,
      likedBy: [],
      created: Date.now(),
    }))

    await Meme.insertMany(memeArray)

    return res.status(201).json({
      message: 'Meme uploded successfully',
    })
  } catch (error) {
    console.log('Add meme error', error)
    return res.status(400)
  }
})

module.exports = router
