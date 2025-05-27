import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Public } from 'src/public/public.decorator';
import { Request } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('菜单权限')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('/createMenu')
  @Public()
  @ApiParam({ name: 'createMenuDto', type: CreateMenuDto })
  @ApiOperation({ summary: '新增菜单' })
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.createMenu(createMenuDto);
  }
}
