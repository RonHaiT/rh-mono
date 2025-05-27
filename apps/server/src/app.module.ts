import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from './cache/cache.module';
import { JwtModule } from '@nestjs/jwt';

import * as path from 'path';
const isProd = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        isProd
          ? path.join(__dirname, '../.env.prod')
          : path.join(__dirname, '../.env'),
      ],
    }),
    TypeOrmModule.forRootAsync({
      useFactory(ConfigService: ConfigService) {
        return {
          type: 'mysql',
          host: ConfigService.get('DB_HOST'),
          port: ConfigService.get('DB_PORT'),
          username: ConfigService.get('DB_USER'),
          password: ConfigService.get('DB_PASSWD'),
          database: ConfigService.get('DB_DATABASE'),
          entities: [User],
          synchronize: !isProd,
          connectorPackage: 'mysql2',
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            // expiresIn: configService.get('JWT_EXPIRES_IN') || '1d', // 默认1天
            expiresIn: 60,
          },
        };
      },
    }),
    CacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
