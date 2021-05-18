import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { Schema as MongooseSchema } from 'mongoose'

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UsersService } from 'src/users/users.service'
import { MemesService } from './memes.service'
import { UserId } from 'src/users/user.decorator'

@Controller('memes')
export class MemesController {
  constructor(
    private readonly memesService: MemesService,
    private readonly usersService: UsersService,
  ) {}

  // @Get()
  // getAll() {
  //   return this.memesService.getAll();
  // }

  // @Get(':id')
  // getOne(@Param('id') id: string) {
  //   return this.memesService.getById(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  async getFromTo(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @UserId() userId: MongooseSchema.Types.ObjectId,
  ) {
    const user = await this.usersService.getById(userId)
    const pageNum = Number(page)
    const limitNum = Number(limit)
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = pageNum * limitNum

    return this.memesService.getFromTo({
      startIndex,
      endIndex,
      page: pageNum,
      limit: limitNum,
      user,
    })
  }

  @UseGuards(JwtAuthGuard)
  @Post('/upload')
  @HttpCode(HttpStatus.CREATED)
  // TODO написать гвард чтоб узнавать количество файлов и мапить тут массив с названиями
  @UseInterceptors(
    FilesInterceptor('attachments[]', 10, {
      storage: diskStorage({
        destination: './public/memes',
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' + file.originalname)
        },
      }),
    }),
  )
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: { memelist: { description: string; categories: string[] }[] },
    @UserId() userId: MongooseSchema.Types.ObjectId,
  ) {
    const { memelist } = body
    const memes = await this.memesService.create({
      userId,
      files,
      memelist,
    })

    return { memes }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/like')
  async like(
    @Body()
    body: {
      _id: MongooseSchema.Types.ObjectId
    },
    @UserId() userId: MongooseSchema.Types.ObjectId,
  ) {
    const memeId = body._id

    return await this.memesService.like(memeId, userId)
  }
}
