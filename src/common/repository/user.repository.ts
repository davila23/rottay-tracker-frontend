import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository {
  async createUser(userDto) {
    const user = new User(undefined);
    user.setData(userDto);
    user.createUser();
    return user;
  }

  async updateUser(userDto) {
    const user = new User(userDto.quotedId);
    user.setData(userDto);
    user.updateUser();
    return user;
  }

  async deleteUser(userDto) {
    const user = new User(userDto.quotedId);
    user.deleteUser();
    return user;
  }

  // Prueba para usar de listener
  async welcomeUser(userDto) {
    const user = new User(userDto.quotedId);
    user.welcomeUser();
    return user;
  }
}
