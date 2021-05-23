import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com', description: 'почта' })
  readonly email: string

  @ApiProperty({ example: '123123', description: 'пароль' })
  readonly password: string
}
