import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'

import { closeInMongodConnection, rootMongooseTestModule } from '../mongo-test'
import { UsersService } from './../users/users.service'
import { AuthService } from './auth.service'
import { Token, TokenSchema } from './schemas/token.schema'
import { User, UserSchema } from '../users/schemas/user.schema'
import { Meme, MemeSchema } from '../memes/schemas/meme.schema'

describe('AuthService', () => {
  let service: AuthService
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService)
  })

  afterEach(async () => {
    await closeInMongodConnection()
    // Чтобы сбросить приложение и закрыть коннект с БД
    module.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
