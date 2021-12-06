import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { closeInMongodConnection } from './mongo-test'

describe('AppController', () => {
  let controller: AppController
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    controller = module.get<AppController>(AppController)
  })

  afterEach(async () => {
    await module.close()
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.getHello()).toBe('Hello World!')
    })
  })
})
