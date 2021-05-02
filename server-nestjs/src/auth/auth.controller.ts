import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';

const refreshTokenLifeSpan = 1000 * 60 * 60 * 24 * 30; // 30 дней

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() userDto: CreateUserDto,
  ) {
    // TODO вынести эту логику в сервис? посмотреть лучшие практики
    const { tokens } = await this.authService.login(userDto);
    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenLifeSpan,
    });

    return {
      tokens: {
        access_token: tokens.accessToken,
      },
    };
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Post('/refresh_tokens')
  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies.refresh_token;
    const { tokens } = await this.authService.refreshTokens(refreshToken);
    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenLifeSpan,
    });

    return {
      tokens: {
        access_token: tokens.accessToken,
      },
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies.refresh_token;
    await this.authService.logout(refreshToken);
    response.cookie('refresh_token', '', { maxAge: 0 });

    return;
  }
}
