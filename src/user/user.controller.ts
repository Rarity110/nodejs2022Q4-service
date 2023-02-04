import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';
import { IUserCreatedResponse } from './interfaces/userCreatedResponse';
import { User } from './interfaces/userModel';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All users are received.',
    type: [User],
  })
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully received.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User does not exist.',
  })
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body does not contain required fields.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User login already exists.',
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = this.userService.createUser(createUserDto);
    const response: IUserCreatedResponse = {
      id: newUser.id,
      login: newUser.login,
    };
    return response;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The password has been successfully updated.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'OldPassword is wrong.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User does not exist.',
  })
  UpdateUserPassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') id: string,
  ) {
    return this.userService.updateUserPassword(updatePasswordDto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not uuid.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User does not exist.',
  })
  removeUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
