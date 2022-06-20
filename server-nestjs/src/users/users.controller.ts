import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Schema as MongooseSchema } from 'mongoose'

import { MemesService } from '../memes/memes.service'
import { Meme } from '../memes/schemas/meme.schema'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { User } from './schemas/user.schema'
import { UserId } from './user.decorator'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly memesService: MemesService,
  ) {}

  @ApiOperation({ summary: 'Получение информации о пользователе' })
  // TODO посмотреть как можно указать тип UserDocument тк сейчас в примере свагера не видно что возвращается _id
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('/info')
  async getInfo(@UserId() userId: MongooseSchema.Types.ObjectId) {
    const user = await this.usersService.getById(userId)

    return { user }
  }

  @ApiOperation({ summary: 'Получение мемов, автор которых - пользователь' })
  // TODO посмотреть как можно указать тип MemeDocument тк сейчас в примере свагера не видно что возвращается _id
  @ApiResponse({ status: 200, type: [Meme] })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('/user_memes')
  async getUserMemes(@UserId() userId: MongooseSchema.Types.ObjectId) {
    // TODO: Вынести в юзера? Посмотреть как лучше
    const userMemes = await this.memesService.getUserMemes(userId)

    return userMemes
  }

  @UseGuards(JwtAuthGuard)
  // TODO поправить пути: префикс user и так есть в самом контроллере,
  // поэтому еще раз в пути его писать не стоит
  @Get('/user_statistics')
  async getUserStatistics(@UserId() userId: MongooseSchema.Types.ObjectId) {
    const { likedMemesCount } = await this.memesService.getUserLikedMemesCount(
      userId,
    )
    const { uploadedMemesCount } =
      await this.memesService.getUserUploadedMemesCount(userId)

    return { likedMemesCount, uploadedMemesCount }
  }
}
