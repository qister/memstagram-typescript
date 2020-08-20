import { likeMeme } from './../client/src/API/memesAPI'
import { Router, Application, Request, Response, NextFunction } from 'express'
import multer, { ErrorCode } from 'multer'

const Meme = require('../models/Meme')

const router = Router()

router.get('/show', async (req: Request, res: Response) => {
  try {
    const meme = await Meme.find({ id: req.query.id })
    res.status(200).json(meme)
  } catch (e) {
    console.log('Error: ', e.message)
  }
})

router.get('/getlist', async (req: Request, res: Response) => {
  try {
    const allMemes: [] = await Meme.find({})

    res.status(200).json(allMemes)
  } catch (e) {
    console.log('Error', e.message)
  }
})

router.post('/likememe', async (req: Request, res: Response) => {
  try {
    console.log('meme to like: ', req.body)
    const { id, email } = req.body
    const memeBefore = await Meme.findOne({ id })
    if (memeBefore.likedBy.some((user: string) => user === email)) {
      await Meme.updateOne(
        { id },
        { likedBy: memeBefore.likedBy.filter((user: string) => user !== email) }
      )
      res.status(201).json(`Meme with id ${id} was disliked`)
    } else {
      await Meme.updateOne({ id }, { likedBy: [...memeBefore.likedBy, email] })
      res.status(201).json(`Meme with id ${id} was liked`)
    }
  } catch (e) {
    console.log('Like error', e.message)
  }
})

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
