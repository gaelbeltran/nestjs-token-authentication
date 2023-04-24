import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(payload) {
    const user = await this.userRepository.save(payload);
    return user;
  }

  async findOne(query: any) {
    const user = await this.userRepository.findOne({
      where: query,
    });
    return user;
  }
}
