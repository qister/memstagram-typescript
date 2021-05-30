import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'

import { closeInMongodConnection, rootMongooseTestModule } from '../mongo-test'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { Meme, MemeSchema } from '../memes/schemas/meme.schema'
import { Token, TokenSchema } from './schemas/token.schema'
import { User, UserSchema } from '../users/schemas/user.schema'
import { UsersService } from '../users/users.service'

describe('AuthController', () => {
  let controller: AuthController
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService],
      imports: [
        JwtModule.register({}),
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Token.name, schema: TokenSchema },
          { name: User.name, schema: UserSchema },
          { name: Meme.name, schema: MemeSchema },
        ]),
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  afterEach(async () => {
    await closeInMongodConnection()
    // Чтобы сбросить приложение и закрыть коннект с БД
    module.close()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
