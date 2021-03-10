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
      const tokenId = req.headers.authorization?.split(' ')[1]
      const { userId } = jwt.verify(tokenId, process.env.ACCESS_TOKEN_SECRET)
      const user = await User.find({ _id: userId })
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

const upload = multer({ storage: storage, fileFilter })

router.post('/addpic', upload.single('file'), async (req, res) => {
  console.log('req body', req.body)
  try {
    const body = JSON.stringify(req.body, null, 2)
    const trueBody = JSON.parse(body)

    const allMemes = await Meme.find({})
    const nextId = allMemes.length

    const meme = new Meme({
      id: nextId,
      author: trueBody.author,
      description: trueBody.description,
      imgUrl: req.file.path,
      likedBy: [],
      created: Date.now(),
    })

    await meme.save()

    return res.status(201).json({
      message: 'Meme uploded successfully',
    })
  } catch (error) {
    console.log('Add meme error', error)
    return res.status(400)
  }
})

module.exports = router
