import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'

import { Meme, MemeSchema } from './schemas/meme.schema'
import { UsersModule } from '../users/users.module'
import { MemesController } from './memes.controller'
import { MemesService } from './memes.service'

@Module({
  providers: [MemesService],
  controllers: [MemesController],
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Meme.name, schema: MemeSchema }]),
    UsersModule,
  ],
  exports: [MemesService],
})
export class MemesModule {}
