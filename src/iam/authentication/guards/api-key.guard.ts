import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../../iam.constants';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';
import { ApiKeyService } from '../api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = this._extractApiKeyFromHeader(request);
    if (!apiKey) {
      throw new UnauthorizedException();
    }

    try {
      const apiKeyEntityId = await this.apiKeyService.getIdFromApiKey(apiKey);
      if (!apiKeyEntityId) {
        throw new UnauthorizedException();
      }

      const apiKeyEntity =
        await this.apiKeyService.findByUuidWithUser(apiKeyEntityId);
      if (!apiKeyEntity) {
        throw new UnauthorizedException();
      }

      const hasAccess = await this.apiKeyService.validateApiKey(
        apiKey,
        apiKeyEntity.key,
      );
      if (!hasAccess) {
        throw new UnauthorizedException();
      }

      request[REQUEST_USER_KEY] = {
        sub: apiKeyEntity.user.id,
        email: apiKeyEntity.user.email,
        role: apiKeyEntity.user.role,
      } as ActiveUserData;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private _extractApiKeyFromHeader(request: Request): string | undefined {
    const [type, apiKey] = request.headers.authorization?.split(' ') ?? [];
    return type === 'ApiKey' ? apiKey : undefined;
  }
  }
