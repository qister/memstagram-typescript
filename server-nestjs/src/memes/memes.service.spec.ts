import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'

import { MemesService } from './memes.service'
import { Meme, MemeSchema } from '../memes/schemas/meme.schema'
import { closeInMongodConnection, rootMongooseTestModule } from '../mongo-test'

describe('MemesService', () => {
  let service: MemesService
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [MemesService],
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Meme.name, schema: MemeSchema }]),
      ],
    }).compile()

    service = module.get<MemesService>(MemesService)
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
