import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis;

  constructor(private readonly configService: ConfigService) {}

  async onApplicationBootstrap() {
    this.redisClient = new Redis({
      host: this.configService.getOrThrow('REDIS_HOST'),
      port: this.configService.getOrThrow('REDIS_PORT'),
      password: this.configService.get('REDIS_PASSWORD'),
    });
  }

  async onApplicationShutdown() {
    await this.redisClient.quit();
  }

  getClient(): Redis {
    return this.redisClient;
  }
}
