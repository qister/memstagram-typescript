import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './../auth/auth.module';
import { Meme, MemeSchema } from './../memes/schemas/meme.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Meme.name, schema: MemeSchema },
    ]),
    AuthModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
