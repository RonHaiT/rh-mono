import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Module({
  controllers: [CacheController],
  providers: [
    CacheService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        const enabled = configService.get('REDIS_ENABLED') === 'true';
        if (!enabled) {
          // 返回一个最小 no-op 客户端，避免调用处报错
          return {
            get: async () => null,
            set: async () => {},
            del: async () => 0,
            exists: async () => 0,
            flushAll: async () => 'OK',
            on: () => {},
            quit: async () => {},
          } as any;
        }
        const client = createClient({
          socket: {
            host: configService.get('RD_HOST'),
            port: configService.get('RD_PORT'),
          },
          password: configService.get('RD_PASSWORD'),
        });
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
