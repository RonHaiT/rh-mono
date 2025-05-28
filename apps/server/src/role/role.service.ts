import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.emum';
import { Menu } from 'src/menu/entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}
  async create(createRoleDto: CreateRoleDto): Promise<string> {
    const row = await this.roleRepository.findOne({
      where: { role_name: createRoleDto.role_name },
    });
    if (row) {
      throw new ApiException('角色已存在', ApiErrorCode.COMMON_CODE);
    }
    const newRole = new Role();
    newRole.role_name = createRoleDto.role_name;
    newRole.remark = createRoleDto.remark || ''; // 处理可选字段
    newRole.status = createRoleDto.status;
    newRole.role_sort = createRoleDto.role_sort;
    newRole.create_by = createRoleDto.create_by;
    newRole.update_by = createRoleDto.update_by;

    if (createRoleDto.menu_ids?.length) {
      //查询包含menu_ids的菜单列表
      const menuList = await this.menuRepository.find({
        where: {
          id: In(createRoleDto.menu_ids),
        },
      });
      //赋值给newRole(插入表中之后就会在关系表中生成对应关系)
      newRole.menus = menuList;
    }
    console.log('createRoleDto', createRoleDto, newRole);

    try {
      await this.roleRepository.save({ ...createRoleDto, ...newRole });
      return 'success';
    } catch (error) {
      throw new ApiException('系统异常', ApiErrorCode.FAIL);
    }
  }
}
