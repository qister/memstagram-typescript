import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { LeanDocument, Model, Schema as MongooseSchema } from 'mongoose'

import { Meme, MemeDocument } from './schemas/meme.schema'

@Injectable()
export class MemesService {
  constructor(@InjectModel(Meme.name) private memeModel: Model<MemeDocument>) {}

  async getById(id: MongooseSchema.Types.ObjectId) {
    const meme = await this.memeModel.findById(id)
    if (!meme) {
      throw new HttpException('Unable to find meme', HttpStatus.BAD_REQUEST)
    }

    return meme
  }

  async like(
    memeId: MongooseSchema.Types.ObjectId,
    userId: MongooseSchema.Types.ObjectId,
  ) {
    const memeBefore = await this.memeModel.findById(memeId)
    if (
      //TODO вынести это в отдельную константу и везде использовать
      memeBefore.likedBy.some((id) => id.toString() === userId.toString())
    ) {
      const updatedMeme = await this.memeModel.findByIdAndUpdate(
        memeId,
        {
          likedBy: memeBefore.likedBy.filter(
            (id) => id.toString() !== userId.toString(),
          ),
        },
        { new: true },
      )

      if (!updatedMeme) {
        throw new HttpException('Unable to find meme', HttpStatus.BAD_REQUEST)
      }

      return { meme: { ...updatedMeme.toObject(), liked: false } }
    } else {
      const updatedMeme = await this.memeModel.findByIdAndUpdate(
        memeId,
        {
          likedBy: [...memeBefore.likedBy, userId],
        },
        { new: true },
      )

      return {
        meme: {
          ...updatedMeme.toObject(),
          liked: true,
        },
      }
    }
  }

  async getFromTo({
    startIndex,
    endIndex,
    page,
    limit,
    userId,
  }: {
    startIndex: number
    endIndex: number
    page: number
    limit: number
    userId: MongooseSchema.Types.ObjectId
  }) {
    const results: {
      next?: { page: number; limit: number }
      previous?: { page: number; limit: number }
      total: number
      memes: LeanDocument<MemeDocument>[]
    } = { total: 0, memes: [] }

    const total = await this.memeModel.countDocuments().exec()
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

    const memesFromDb = await this.memeModel
      .find()
      .limit(limit)
      .skip(startIndex)
      .exec()

    const memes = memesFromDb.map((meme) => meme.toObject())
    const memesWithLikes = memes.map((meme) => {
      return meme.likedBy.some((id) => id.toString() === userId.toString())
        ? { ...meme, liked: true }
        : { ...meme, liked: false }
    })
    results.memes = memesWithLikes

    return results
  }

  async create({
    userId,
    files,
    memelist,
  }: {
    userId: MongooseSchema.Types.ObjectId
    files: Array<Express.Multer.File>
    memelist: { description: string; categories: string[] }[]
  }) {
    const memeArray = memelist.map(({ description, categories }, index) => ({
      authorId: userId,
      description,
      categories,
      imgUrl: files[index].path,
      likedBy: [],
      created: new Date(),
    }))

    try {
      const newMemes = await this.memeModel.insertMany(memeArray)

      return newMemes
    } catch (error) {
      throw new HttpException('Unable to save memes', HttpStatus.BAD_REQUEST)
    }
  }
}
