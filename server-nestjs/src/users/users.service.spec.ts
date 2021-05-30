import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'

import { MemesService } from './../memes/memes.service'
import { User, UserSchema } from './schemas/user.schema'
import { Meme, MemeSchema } from '../memes/schemas/meme.schema'
import { closeInMongodConnection, rootMongooseTestModule } from '../mongo-test'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let usersService: UsersService
  let memesService: MemesService
  let module: TestingModule

  const userDto = {
    email: 'test@test.com',
    password: '123123',
  }

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [UsersService, MemesService],
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Meme.name, schema: MemeSchema },
        ]),
      ],
    }).compile()

    usersService = module.get<UsersService>(UsersService)
    memesService = module.get<MemesService>(MemesService)
  })

  afterEach(async () => {
    await closeInMongodConnection()
    // Чтобы сбросить приложение и закрыть коннект с БД
    module.close()
  })

  it('should be defined', () => {
    expect(usersService).toBeDefined()
  })

  it('Получение юзера по id', async () => {
    jest.spyOn(usersService, 'getById')

    const user = await usersService.create(userDto)
    const userInfo = await usersService.getById(user._id)

    expect(user).toEqual(userInfo)
    expect(usersService.getById).toHaveBeenCalled()
  })

  it('Получение юзера по email', async () => {
    jest.spyOn(usersService, 'getByEmail')

    const user = await usersService.create(userDto)
    const userInfo = await usersService.getByEmail(userDto.email)

    expect(user).toEqual(userInfo)
    expect(usersService.getByEmail).toHaveBeenCalled()
  })

  it('Создание пользователя', async () => {
    jest.spyOn(usersService, 'create')

    const user = await usersService.create(userDto)
    const userInfo = await usersService.getById(user._id)

    expect(userInfo.email).toEqual(userDto.email)
    expect(usersService.create).toHaveBeenCalled()
  })

  it('Получение мемов пользователя', async () => {
    jest.spyOn(usersService, 'getUserMemes')

    const user = await usersService.create(userDto)
    // TODO загружать мемы в базу и тестировать появились ли они там
    const userMemes = await usersService.getUserMemes(user._id)

    expect(userMemes).toEqual({ memes: [], total: 0 })
  })
})
