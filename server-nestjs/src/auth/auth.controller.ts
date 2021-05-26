import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { CreateUserDto } from './../users/dto/create-user.dto'

const refreshTokenLifeSpan = 1000 * 60 * 60 * 24 * 30 // 30 дней

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Логин' })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        tokens: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmExYzIwNDQ2ZDFiMTExZDZhZGQ2YWUiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjIxNjg0ODg1LCJleHAiOjE2MjE2ODU3ODV9.G8Ihcj2MiKdAV5Ntu_Bq2FxLGOgOmtX__W_ngCsMMmg',
        },
      },
    },
  })
  @Post('/login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() userDto: CreateUserDto,
  ) {
    // TODO вынести эту логику в сервис? посмотреть лучшие практики
    const { tokens } = await this.authService.login(userDto)
    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenLifeSpan,
    })

    return {
      tokens: {
        access_token: tokens.accessToken,
      },
    }
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        user: {
          email: 'test@test.com',
        },
      },
    },
  })
  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    const user = await this.authService.registration(userDto)

    return user
  }

  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        tokens: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmExYzIwNDQ2ZDFiMTExZDZhZGQ2YWUiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjIxNjg0ODg1LCJleHAiOjE2MjE2ODU3ODV9.G8Ihcj2MiKdAV5Ntu_Bq2FxLGOgOmtX__W_ngCsMMmg',
        },
      },
    },
  })
  @Post('/refresh_tokens')
  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies.refresh_token
    const { tokens } = await this.authService.refreshTokens(refreshToken)
    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenLifeSpan,
    })

    return {
      tokens: {
        access_token: tokens.accessToken,
      },
    }
  }

  @ApiOperation({ summary: 'Логаут' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies.refresh_token
    await this.authService.logout(refreshToken)
    response.cookie('refresh_token', '', { maxAge: 0 })

    return
  }
}
