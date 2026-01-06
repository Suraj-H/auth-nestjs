import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from '../../common/services/redis.service';
import { InvalidatedRefreshTokenError } from '../errors/refresh-token-error';

@Injectable()
export class RefreshTokenIdsStorage {
  private get redisClient(): Redis {
    return this.redisService.getClient();
  }

  constructor(private readonly redisService: RedisService) {}

  async insert(userId: number, tokenId: string): Promise<void> {
    await this.redisClient.set(this._getKey(userId), tokenId);
  }

  async validate(userId: number, tokenId: string): Promise<boolean> {
    const storedTokenId = await this.getTokenId(userId);
    if (storedTokenId === null || storedTokenId !== tokenId)
      throw new InvalidatedRefreshTokenError();

    return storedTokenId === tokenId;
  }

  async invalidate(userId: number): Promise<void> {
    await this.redisClient.del(this._getKey(userId));
  }

  async getTokenId(userId: number): Promise<string | null> {
    const key = this._getKey(userId);
    return await this.redisClient.get(key);
  }

  private _getKey(userId: number): string {
    return `user-${userId}`;
  }
}
