import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptPasswordUtils } from 'src/common/decorators/bcrypt-password.decorator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(BcryptPasswordUtils) private readonly passwordUtils: BcryptPasswordUtils,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: await this.passwordUtils.hash(createUserDto.password),
    });
    const newSavedUser = await this.userRepository.save(newUser);
    return newSavedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }
}
