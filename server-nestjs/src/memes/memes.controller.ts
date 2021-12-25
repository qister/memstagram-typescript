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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { MemesService } from './memes.service'
import { UserId } from '../users/user.decorator'
import { FilesUploadDto } from './dto/file-upload.dto'

const DEFAULT_PAGE_NUM = 1
const DEFAULT_LIMIT = 3

@Controller('memes')
export class MemesController {
  constructor(private readonly memesService: MemesService) {}

  // @Get()
  // getAll() {
  //   return this.memesService.getAll();
  // }

  // @Get(':id')
  // getOne(@Param('id') id: string) {
  //   return this.memesService.getById(id);
  // }

  @ApiOperation({ summary: 'Получение cписка мемов' })
  // TODO посмотреть как можно указать тип UserDocument тк сейчас в примере свагера не видно что возвращается _id
  // TODO вынести респонс в отедельный файл?
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        next: {
          page: 2,
          limit: 2,
        },
        previous: {
          page: 1,
          limit: 2,
        },
        total: 126,
        // TODO поправить чтобы была ссылка на Meme и подтягивались значения
        memes: [
          {
            authorId: '5fa1c20446d1b111d6add6ae',
            categories: [],
            created: '2021-04-20T14:08:26.618Z',
            description: 'test',
            imgUrl: 'public/images/1618927706604-image_2021-04-08_16-45-16.png',
            liked: true,
            likedBy: ['5fa1c20446d1b111d6add6ae'],
            __v: 0,
            _id: '607ee05a20cff60d9ef46836',
          },
          {
            authorId: '5fa1c20446d1b111d6add6ae',
            categories: ['school', 'surrealistic'],
            created: '2021-05-17T17:52:40.370Z',
            description: 'test',
            imgUrl: 'public/memes/1621273960363-шт.jpg',
            liked: true,
            likedBy: ['5fa1c20446d1b111d6add6ae'],
            __v: 0,
            _id: '60a2ad68d77d0f2d2b9058f0',
          },
        ],
      },
    },
  })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('/list')
  async getFromTo(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @UserId() userId: MongooseSchema.Types.ObjectId,
  ) {
    const pageNum = Number(page ?? DEFAULT_PAGE_NUM)
    const limitNum = Number(limit ?? DEFAULT_LIMIT)
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = pageNum * limitNum

    return this.memesService.getFromTo({
      startIndex,
      endIndex,
      page: pageNum,
      limit: limitNum,
      userId,
    })
  }

  @ApiOperation({ summary: 'Загрузка мема' })
  @ApiResponse({
    status: 200,
    schema: {
      example: [
        {
          likedBy: [],
          categories: ['politics'],
          _id: '60aa2e5dbc7d755e855e86a3',
          authorId: '5fa1c20446d1b111d6add6ae',
          description: 'test',
          imgUrl: 'public/memes/1621765725518-шт.jpg',
          created: '2021-05-23T10:28:45.544Z',
          __v: 0,
        },
        {
          likedBy: [],
          categories: ['school', 'surrealistic'],
          _id: '60aa2e5dbc7d755e855e86a4',
          authorId: '5fa1c20446d1b111d6add6ae',
          description: 'test',
          imgUrl: 'public/memes/1621765725524-шт copy.jpg',
          created: '2021-05-23T10:28:45.544Z',
          __v: 0,
        },
      ],
    },
  })
  @ApiBearerAuth('JWT')
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Список категорий и описаний мемов',
    type: FilesUploadDto,
  })
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

  @ApiOperation({ summary: 'Лайк мема' })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        authorId: '5fa1c20446d1b111d6add6ae',
        categories: ['politics'],
        created: '2021-05-17T17:52:40.370Z',
        description: 'test',
        imgUrl: 'public/memes/1621273960362-шт.jpg',
        liked: true,
        likedBy: [],
        __v: 0,
        _id: '60a2ad68d77d0f2d2b9058ef',
      },
    },
  })
  @ApiBearerAuth('JWT')
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
