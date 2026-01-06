import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { ApiKey } from '../entities/api-key.entity';
import { HashingService } from '../hashing/hashing.service';
import { GeneratedApiKeyPayload } from './interfaces/generated-api-key-payload.interface';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
    private readonly hashingService: HashingService,
  ) {}

  async findByUuidWithUser(uuid: string): Promise<ApiKey | null> {
    return this.apiKeyRepository.findOne({
      where: { uuid },
      relations: { user: true },
    });
  }

  async generateAndHashApiKey(id: string): Promise<GeneratedApiKeyPayload> {
    const apiKey = await this._generateApiKey(id);
    const hashedKey = await this.hashingService.hash(apiKey);
    return { apiKey, hashedKey };
  }

  async getIdFromApiKey(apiKey: string): Promise<string> {
    const decodedApiKey = Buffer.from(apiKey, 'base64').toString('ascii');
    const [id, _] = decodedApiKey.split(' ');
    return id;
  }

  async validateApiKey(apiKey: string, hashedKey: string): Promise<boolean> {
    return await this.hashingService.compare(apiKey, hashedKey);
  }

  private async _generateApiKey(id: string): Promise<string> {
    const apiKey = `${id} ${randomUUID()}`;
    return Buffer.from(apiKey).toString('base64');
  }
}
