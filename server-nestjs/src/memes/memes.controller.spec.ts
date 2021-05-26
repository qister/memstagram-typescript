import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'

import { closeInMongodConnection, rootMongooseTestModule } from '../mongo-test'
import { MemesController } from './memes.controller'
import { Meme, MemeSchema } from '../memes/schemas/meme.schema'
import { MemesService } from './memes.service'

describe('MemesController', () => {
  let controller: MemesController
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [MemesController],
      providers: [MemesService],
      imports: [
        JwtModule.register({}),
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Meme.name, schema: MemeSchema }]),
      ],
    }).compile()

    controller = module.get<MemesController>(MemesController)
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
