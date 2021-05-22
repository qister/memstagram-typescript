import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Schema as MongooseSchema } from 'mongoose'

import { Meme } from 'src/memes/schemas/meme.schema'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { User } from './schemas/user.schema'
import { UserId } from './user.decorator'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    const userMemes = await this.usersService.getUserMemes(userId)

    return userMemes
  }
}
