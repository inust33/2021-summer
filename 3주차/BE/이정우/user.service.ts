import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository : Repository<User>
  ) {}
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async createUser(user: User) {
    this.userRepository.save(user);
  }

  async remove(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }

  async editUser(userId: number, user: User): Promise<User> {
    const editedUser = await this.userRepository.findOne(userId);
    if (!editedUser) {
      throw new NotFoundException('User is not found');
    }
    editedUser.name = user.name;
    editedUser.nickname = user.nickname;
    await editedUser.save();
    return editedUser;
  }
};
