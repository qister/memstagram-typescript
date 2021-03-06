import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
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
import { AppController } from '../src/app.controller'
import { AppService } from '../src/app.service'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let moduleFixture: TestingModule

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        AuthModule,
        UsersModule,
        JwtModule.register({}),
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Meme.name, schema: MemeSchema },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await closeInMongodConnection()
    // Чтобы сбросить приложение и закрыть коннект с БД
    // await app.close()
    await moduleFixture.close()
    // await app.close()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })
})
