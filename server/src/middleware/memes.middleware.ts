import { Request, Response, NextFunction } from 'express'
import { IMeme } from '../models/Meme'

const paginatedResults = (model: any) => {
  return async (req: Request, res: Response & any, next: NextFunction) => {
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results: any = {}

    try {
      const total = await model.countDocuments().exec()
      results.total = total
      if (endIndex < total) {
        results.next = {
          page: page + 1,
          limit,
        }
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit,
        }
      }

      const memesFromDb = await model
        .find()
        .limit(limit)
        .skip(startIndex)
        .exec()

      const memes = memesFromDb.map((meme: IMeme) => meme.toObject())
      results.memes = memes
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
      console.log(e.stack)
    }
  }
}

module.exports = paginatedResults
