import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')
  app.use(cookieParser())
  const config = new DocumentBuilder()
    .setTitle('Мемстаграм')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('API V1') // хз зачем нужен этот тег)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document)
  await app.listen(process.env.PORT || 5005)
}
bootstrap()
