import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}
  // @Post('set')
  // async setVal(@Body() val) {
  //   return await this.cacheService.set('name', 'rh');
  // }
  // @Get('get')
  // async getVal(@Body() val) {
  //   return await this.cacheService.get('name');
  // }
  // @Delete('del')
  // async delVal(@Body() val) {
  //   return await this.cacheService.del('name');
  // }
  // @Get('exists')
  // async existsVal(@Body() val) {
  //   return await this.cacheService.exists('name');
  // }
  // @Post('flushall')
  // async flushallVal() {
  //   return await this.cacheService.flushall();
  // }
}
