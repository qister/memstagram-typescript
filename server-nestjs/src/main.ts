import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')
  app.use(cookieParser())

  const whitelist = [
    'https://memstagram-typescript.vercel.app',
    'http://localhost:3000',
  ]
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true)
      } else {
        console.info('blocked cors for:', origin)
        callback(new Error('Not allowed by CORS'))
      }
    },
  })

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
  await app.listen(process.env.PORT ?? '4001')
}
bootstrap()
