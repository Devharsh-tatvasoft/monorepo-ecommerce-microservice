import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Post('register')
  async register(@Body() registerDto: any) {
    try {
      return await firstValueFrom(
        this.authService.send({ cmd: 'register' }, registerDto),
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    try {
      return await firstValueFrom(
        this.authService.send({ cmd: 'login' }, loginDto),
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
