import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Token, TokenSchema } from './schemas/token.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  exports: [AuthService],
})
export class AuthModule {}
