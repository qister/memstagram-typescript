import { Controller, Get, UseGuards } from '@nestjs/common'
import { Schema as MongooseSchema } from 'mongoose'

import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { UserId } from './user.decorator'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/info')
  async getInfo(@UserId() userId: MongooseSchema.Types.ObjectId) {
    const user = await this.usersService.getById(userId)

    return { user }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user_memes')
  async getUserMemes(@UserId() userId: MongooseSchema.Types.ObjectId) {
    const userMemes = await this.usersService.getUserMemes(userId)

    return userMemes
  }
}
