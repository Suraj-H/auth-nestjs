import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findByEmail(
    email: string,
    select?: FindOptionsSelect<User>,
  ): Promise<User> {
    return this.usersRepository.findOneOrFail({
      where: { email },
      select,
    });
  }

  async findByGoogleId(
    googleId: string,
    select?: FindOptionsSelect<User>,
  ): Promise<User> {
    return await this.usersRepository.findOneOrFail({
      where: { googleId },
      select,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number, select?: FindOptionsSelect<User>): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: { id },
        select,
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
