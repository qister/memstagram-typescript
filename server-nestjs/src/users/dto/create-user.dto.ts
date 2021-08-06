import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com', description: 'почта' })
  readonly email: string

  @ApiProperty({ example: '123123', description: 'пароль' })
  readonly password: string

  @ApiProperty({ example: 'testnickname', description: 'никнэйм' })
  readonly nickname: string

  @ApiProperty({ description: 'файл' })
  readonly file: Express.Multer.File
}
