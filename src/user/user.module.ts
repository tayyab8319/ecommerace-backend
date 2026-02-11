import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BcryptPasswordUtils } from 'src/common/decorators/bcrypt-password.decorator';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [RoleModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, BcryptPasswordUtils],
  exports: [UserService],
})
export class UserModule {}
