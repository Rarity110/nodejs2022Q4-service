import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import {
  v4 as uuid,
  validate as uuidValidate,
  version as uuidVersion,
} from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: IUser[] = [];

  getUsers() {
    return this.users;
  }

  getUser(id: string) {
    this.isNotUuidExeption(id);

    return this.findUser(id);
  }

  createUser(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    if (!login || !password) {
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (this.users.filter((user) => user.login === login)[0]) {
      throw new HttpException('User login already exists', HttpStatus.CONFLICT);
    }

    const newUser = {
      id: uuid(),
      login: login,
      password: password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);

    return newUser;
  }

  updateUserPassword(updatePasswordDto: UpdatePasswordDto, id: string) {
    if (!updatePasswordDto.newPassword && !updatePasswordDto.oldPassword) {
      throw new HttpException('Id is not uuid', HttpStatus.BAD_REQUEST);
    }
    this.isNotUuidExeption(id);

    const user = this.findUser(id);

    if (updatePasswordDto.oldPassword !== user.password) {
      throw new HttpException('OldPassword is wrong', HttpStatus.FORBIDDEN);
    }

    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return user;
  }

  deleteUser(id: string) {
    this.isNotUuidExeption(id);

    this.findUser(id);

    const newUsers = this.users.filter((item) => item.id !== id);

    this.users = newUsers;
  }

  isNotUuidExeption = (id: string): void => {
    const isUuid = uuidValidate(id) && uuidVersion(id) === 4;
    if (!isUuid) {
      throw new HttpException('Id is not uuid', HttpStatus.BAD_REQUEST);
    }
  };

  findUser = (id: string): IUser => {
    const user = this.users.filter((el) => el.id === id)[0];
    if (!user) {
      throw new HttpException(
        `User with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  };
}
