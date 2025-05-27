import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserVo } from './vo/create-user.vo';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/public/public.decorator';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({
    summary: '添加用户', // 接口描述信息
  })
  @ApiOkResponse({
    description: '返回示例',
    type: CreateUserVo,
  })
  @ApiBearerAuth()
  @Post('register')
  @HttpCode(200)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @ApiOperation({
    summary: '用户登录', // 接口描述信息
  })
  @Post('login')
  @ApiOkResponse({
    description: '返回示例',
    type: CreateUserVo,
  })
  @HttpCode(200)
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Public()
  @ApiOperation({
    summary: '获取图片验证码', // 接口描述信息
  })
  @Get('captcha')
  getCaptcha() {
    return this.userService.getCaptcha();
  }

  @Post('test')
  @ApiOperation({
    summary: '测试token', // 接口描述信息
  })
  test() {
    return 1;
  }
}
