import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
@Injectable()
export class CacheService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  //获取值
  async get(key) {
    let value = await this.redisClient.get(key);
    try {
      value = JSON.parse(value!);
    } catch (error) {}
    return value;
  }

  //设置值
  async set(key: string, value: any, second?: number) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    await this.redisClient.set(key, value, { EX: second });
  }

  //删除值
  async del(key: string) {
    return await this.redisClient.del(key);
  }

  //值是否存在
  async exists(key) {
    const exists = await this.redisClient.exists(key);
    return exists === 1;
  }

  //清楚缓存
  async flushall() {
    return await this.redisClient.flushAll();
  }
}
