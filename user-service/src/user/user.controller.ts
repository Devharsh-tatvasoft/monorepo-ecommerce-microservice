import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'find_all_users' })
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'find_user_by_id' })
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }

  @MessagePattern({ cmd: 'find_user_by_email' })
  findByEmail(@Payload() email: string) {
    return this.userService.findByEmail(email);
  }

  @MessagePattern({ cmd: 'update_user' })
  update(@Payload() payload: { id: string; updateUserDto: UpdateUserDto }) {
    return this.userService.update(payload.id, payload.updateUserDto);
  }

  @MessagePattern({ cmd: 'remove_user' })
  remove(@Payload() id: string) {
    return this.userService.remove(id);
  }
}
