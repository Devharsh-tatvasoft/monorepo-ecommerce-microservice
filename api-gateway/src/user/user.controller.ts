import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() createUserDto: any) {
    return await firstValueFrom(
      this.userService.send({ cmd: 'create_user' }, createUserDto),
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findAll() {
    return await firstValueFrom(
      this.userService.send({ cmd: 'find_all_users' }, {}),
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return await firstValueFrom(
      this.userService.send({ cmd: 'find_user_by_id' }, id),
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    return await firstValueFrom(
      this.userService.send({ cmd: 'update_user' }, { id, updateUserDto }),
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return await firstValueFrom(
      this.userService.send({ cmd: 'remove_user' }, id),
    );
  }
}
