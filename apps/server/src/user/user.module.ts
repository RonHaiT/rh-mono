import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { UserGuard } from './user.guard';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: UserGuard, // 全局注册UserGuard
    },
  ],
  imports: [TypeOrmModule.forFeature([User]), CacheModule],
})
export class UserModule {}
