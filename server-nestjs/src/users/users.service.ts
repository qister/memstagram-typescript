import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Schema as MongooseSchema } from 'mongoose'

import { User, UserDocument } from './schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getById(id: MongooseSchema.Types.ObjectId) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new HttpException('Юзер не найден', HttpStatus.BAD_REQUEST)
    }

    return user
  }

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email })

    if (user) return user
    return null
  }

  async create(userDto: CreateUserDto) {
    const user = new this.userModel(userDto)
    const newUser = await user.save()

    return newUser
  }
}
