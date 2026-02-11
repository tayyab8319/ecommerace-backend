import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async create(createRoleDto: CreateRoleDto) {
    const newRole = this.roleRepository.create(createRoleDto);
    const saveRole = await this.roleRepository.save(newRole);
    return saveRole;
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOne(name: string) {
    const role = await this.roleRepository.findOneBy({ name });
    if (!role) {
      throw new NotFoundException(`Role ${name} not found`);
    }
    return role;
  }

  async update(name: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOneBy({ name });
    if (!role) {
      throw new NotFoundException(`Role ${name} not found`);
    }
    if (updateRoleDto.description !== undefined) {
      role.description = updateRoleDto.description;
    }
    const updatedRole = await this.roleRepository.save(role);
    return updatedRole;
  }

  async remove(name: string) {
    const role = await this.roleRepository.findOneBy({ name });
    if (!role) {
      throw new NotFoundException(`Role ${name} not found`);
    }
    role.isActive = false;
    await this.roleRepository.save(role);
    return { message: `Role ${name} has been deactivated` };
  }
}
