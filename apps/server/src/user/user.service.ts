import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.emum';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import encry from '../utils/crypto';
import generateCaptcha from '../utils/generateCaptcha';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
  ) {}

  // 用户注册
  async create(createUserDto: CreateUserDto) {
    const { username, password, captcha, id } = createUserDto;

    //缓存的验证码
    const cacheCaptcha = await this.cacheService.get(id);
    console.log('register', cacheCaptcha?.toUpperCase());

    if (captcha?.toUpperCase() !== cacheCaptcha?.toUpperCase()) {
      throw new ApiException('验证码错误', ApiErrorCode.COMMON_CODE);
    }

    const existUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existUser)
      throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST);
    try {
      const newUser = new User();
      newUser.username = username;
      newUser.password = password;
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 登录
  async login(loginDto: LoginDto) {
    const { username, password, captcha, id } = loginDto;

    //缓存的验证码
    // const cacheCaptcha = await this.cacheService.get(id);
    // console.log('login', cacheCaptcha?.toUpperCase());
    // if (captcha?.toUpperCase() !== cacheCaptcha?.toUpperCase()) {
    //   throw new ApiException('验证码错误', ApiErrorCode.COMMON_CODE);
    // }

    const user = await this.findOne(username);
    if (user.password !== encry(password, user.salt)) {
      throw new ApiException('密码错误', ApiErrorCode.PASSWORD_ERR);
    }
    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    this.cacheService.set(token, token, 7200);
    return token;
  }

  // 查找用户
  async findOne(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new ApiException('用户不存在', ApiErrorCode.USER_NOT_EXIST);
    }
    return user;
  }
  // 生成图形验证码
  getCaptcha() {
    const { id, captcha } = generateCaptcha();
    this.cacheService.set(id, captcha.text.toUpperCase(), 180);
    return { id, img: captcha.data };
  }
}
