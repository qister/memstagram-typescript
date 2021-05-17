import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { MemeDocument } from 'src/memes/schemas/meme.schema';
import { Meme } from './../memes/schemas/meme.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Meme.name) private memeModel: Model<MemeDocument>,
  ) {}

  async getById(id: MongooseSchema.Types.ObjectId) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('Юзер не найден', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async getByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(userDto: CreateUserDto) {
    const newUser = new this.userModel(userDto);

    return newUser.save();
  }

  async getUserMemes(userId: MongooseSchema.Types.ObjectId) {
    const total = await this.memeModel
      .find({ authorId: userId })
      .countDocuments()
      .exec();
    const userMemes = await this.memeModel.find({ authorId: userId });

    return { memes: userMemes, total };
  }
}
