import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptPasswordUtils } from 'src/common/decorators/bcrypt-password.decorator';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(BcryptPasswordUtils) private readonly passwordUtils: BcryptPasswordUtils,
    @Inject() private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const role = await this.roleService.findOne('user');
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: await this.passwordUtils.hash(createUserDto.password),
      role: role,
    });
    const newSavedUser = await this.userRepository.save(newUser);
    return newSavedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async compareUserPassword(password: string, newPassword: string) {
    return this.passwordUtils.compare(newPassword, password);
  }
}
