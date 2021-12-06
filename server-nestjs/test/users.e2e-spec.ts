import { Test, TestingModule } from '@nestjs/testing'
import { forwardRef, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthModule } from './../src/auth/auth.module'
import { UsersModule } from './../src/users/users.module'
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../src/mongo-test'
import { User, UserSchema } from '../src/users/schemas/user.schema'
import { Meme, MemeSchema } from '../src/memes/schemas/meme.schema'
import { UsersService } from '../src/users/users.service'
import { MemesModule } from '../src/memes/memes.module'

describe('UsersController (e2e)', () => {
  let app: INestApplication
  let moduleFixture: TestingModule

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        AuthModule,
        UsersModule,
        forwardRef(() => MemesModule),
        JwtModule.register({}),
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Meme.name, schema: MemeSchema },
        ]),
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    // await app.close()
  })

  afterEach(async () => {
    await closeInMongodConnection()
    // Чтобы сбросить приложение и закрыть коннект с БД
    // await app.close()
    await moduleFixture.close()
  })

  it('users/info (GET) должен возвращать информацию о пользователе', async () => {
    const userDto = { email: 'test@test.com', password: '123123' }

    const {
      body: { user },
    } = await request(app.getHttpServer())
      .post('/auth/registration')
      .send(userDto)

    const {
      body: {
        tokens: { access_token },
      },
    } = await request(app.getHttpServer()).post('/auth/login').send(userDto)

    return request(app.getHttpServer())
      .get('/users/info')
      .set({ Authorization: `Bearer ${access_token}` })
      .expect(200)
      .expect({ user })
  })
})
