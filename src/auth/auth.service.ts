import { Inject, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject() private jwtService: JwtService,
    @Inject() private readonly userService: UserService,
  ) {}

  async registerUser(registerAuthDto: RegisterAuthDto): Promise<{ accessToken: string }> {
    const user = await this.userService.create(registerAuthDto);

    const payload = {
      id: user.id,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  loginUser(loginAuthDto: LoginAuthDto) {
    return `This action updates auth` + loginAuthDto;
  }
}
