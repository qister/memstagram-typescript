import { ApiProperty } from '@nestjs/swagger'

export class FilesUploadDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description:
      'Файлы с мемами. Файлов столько же, сколько элементов в memelist',
  })
  files: any[]

  @ApiProperty({
    example: [
      { description: 'Описание мема', categories: ['school', 'music'] },
      { description: 'Описание второго мема', categories: ['surrealistic'] },
    ],

    description: 'Описания и категории мемов',
    type: 'array',
    items: { type: 'object', items: { type: 'string' } },
  })
  memelist: any[]
}
