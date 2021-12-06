import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { MemesModule } from '../memes/memes.module'
import { AuthModule } from './../auth/auth.module'
import { Meme, MemeSchema } from './../memes/schemas/meme.schema'
import { User, UserSchema } from './schemas/user.schema'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Meme.name, schema: MemeSchema },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => MemesModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
