import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { UserDocument } from './../users/schemas/user.schema';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Token, TokenDocument } from './schemas/token.schema';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    //TODO добавить обработку ошибок trycatch или посмотреть лучшие практики как это делается
    const user = await this.validateUser(userDto);
    const tokens = await this.updateTokens(user._id.toString());

    return { tokens };
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'Такой пользователь уже есть',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });

    // можно возвращать сразу токен чтобы сразу логиниться
    return { user: { email: user.email } };
  }

  private async validateUser(userDto: CreateUserDto): Promise<UserDocument> {
    try {
      const user = await this.usersService.getByEmail(userDto.email);

      if (!user) {
        throw new UnauthorizedException({
          message: 'Некорретный емейл',
        });
      }

      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );

      if (!passwordEquals) {
        throw new UnauthorizedException({
          message: 'Некорретный пароль',
        });
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Ошибка при валидации юзера',
      });
    }
  }

  // TODO пока написал как было раньше, потом можно заменить на passportjs

  private generateAccessToken(userId: string) {
    const accessToken = this.jwtService.sign(
      { userId, type: 'access' },
      {
        secret: `${process.env.ACCESS_TOKEN_SECRET}`,
        expiresIn: '15m',
      },
    );
    return accessToken;
  }

  private generateRefreshToken(userId: string) {
    return this.jwtService.sign(
      { userId, type: 'refresh' },
      {
        secret: `${process.env.REFRESH_TOKEN_SECRET}`,
        expiresIn: '30d',
      },
    );
  }

  private async replaceDbRefreshToken(tokenId: string, userId: string) {
    await this.tokenModel.findOneAndRemove({ userId }).exec();
    await this.tokenModel.create({ tokenId, userId });
  }

  private async updateTokens(userId: string) {
    try {
      const accessToken = this.generateAccessToken(userId);
      const refreshToken = this.generateRefreshToken(userId);
      await this.replaceDbRefreshToken(refreshToken, userId);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new HttpException(
        'Unable to update tokens',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async refreshTokens(refreshToken: string) {
    try {
      const token = this.jwtService.verify(refreshToken, {
        secret: `${process.env.REFRESH_TOKEN_SECRET}`,
      });

      if (token.type !== 'refresh') {
        throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
      }

      const tokenFromDb = await this.tokenModel
        .findOne({ tokenId: refreshToken })
        .exec();

      if (tokenFromDb === null) {
        throw new HttpException(
          'Invalid token - no token!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const tokens = await this.updateTokens(tokenFromDb.userId);

      return { tokens };
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new HttpException('Token expired!', HttpStatus.BAD_REQUEST);
      } else if (e instanceof JsonWebTokenError) {
        throw new HttpException('Invalid token!', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Unable to refresh tokens',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async logout(refreshToken: string) {
    try {
      const { userId } = this.jwtService.verify(refreshToken, {
        secret: `${process.env.REFRESH_TOKEN_SECRET}`,
      });
      await this.tokenModel.findOneAndRemove({ userId }).exec();
    } catch (error) {
      throw new HttpException('Unable to logout!', HttpStatus.BAD_REQUEST);
    }
  }
}
