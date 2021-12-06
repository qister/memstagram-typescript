import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'

import { MemesService } from './../memes/memes.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { closeInMongodConnection, rootMongooseTestModule } from '../mongo-test'
import { User, UserSchema } from './schemas/user.schema'
import { Meme, MemeSchema } from '../memes/schemas/meme.schema'

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService
  let memesService: MemesService
  let module: TestingModule

  // const mockUsersService = {
  //   getById: async () => ({
  //     name: 'alex',
  //   }),
  // }
  // const mockGuardService = {}

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, MemesService],
      imports: [
        JwtModule.register({}),
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Meme.name, schema: MemeSchema },
        ]),
        // AuthModule,
      ],
    })
      // .overrideProvider(UsersService)
      // .useValue(mockUsersService)
      // .overrideGuard(JwtAuthGuard)
      // .useValue(mockGuardService)
      .compile()

    usersService = module.get<UsersService>(UsersService)
    memesService = module.get<MemesService>(MemesService)
    usersController = module.get<UsersController>(UsersController)
  })

  afterEach(async () => {
    // Чтобы сбросить приложение и закрыть коннект с БД
    await module.close()
    await closeInMongodConnection()
  })

  // it('...', async () => {
  //   const User = mongoose.model('User', new mongoose.Schema({ name: String }))
  //   const count = await User.count()
  //   expect(count).toEqual(0)
  // })

  it('should be defined', () => {
    expect(usersController).toBeDefined()
  })

  it('Получение информации о пользователе', async () => {
    // const info = async () => ({ email: 'test@test.com', password: '123123' })
    const user = await usersService.create({
      email: 'test@test.com',
      password: '123123',
    })

    jest.spyOn(usersService, 'getById')
    jest.spyOn(usersController, 'getInfo')
    //   .mockImplementation(async () => await info())

    const newUser = await usersController.getInfo(user._id)

    expect(newUser).toEqual({
      user,
    })
    expect(usersService.getById).toHaveBeenCalled()
    expect(usersController.getInfo).toHaveBeenCalled()
  })

  it('Получение мемов пользователя', async () => {
    const user = await usersService.create({
      email: 'test@test.com',
      password: '123123',
    })
    // TODO загружать мемы в базу и тестировать появились ли они там
    const userMemes = await usersController.getUserMemes(user._id)

    expect(userMemes).toEqual({ memes: [], total: 0 })
  })
})
