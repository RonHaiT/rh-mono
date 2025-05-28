import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiParam, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/public/public.decorator';

@Controller('role')
@ApiTags('角色模块')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Public()
  @Post('createRole')
  @ApiOperation({ summary: '创建角色' })
  @ApiParam({
    name: 'CreateRoleDto',
    type: CreateRoleDto,
  })
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }
}
