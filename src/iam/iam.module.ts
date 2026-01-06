import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RedisStore } from 'connect-redis';
import session from 'express-session';
import passport from 'passport';
import { UsersModule } from 'src/users/users.module';
import { ApiKeyService } from './authentication/api-key.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { ApiKeyGuard } from './authentication/guards/api-key.guard';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { OtpAuthenticationService } from './authentication/otp-authentication.service';
import { UserSerializer } from './authentication/serializers/user-serializer';
import { SessionAuthenticationController } from './authentication/session-authentication.controller';
import { SessionAuthenticationService } from './authentication/session-authentication.service';
import { GoogleAuthenticationController } from './authentication/social/google-authentication.controller';
import { GoogleAuthenticationService } from './authentication/social/google-authentication.service';
import { RefreshTokenIdsStorage } from './authentication/storage/refresh-token-ids.storage';
import { PoliciesGuard } from './authorization/guards/policies.guard';
import { RoleGuard } from './authorization/guards/role.guard';
import { OrganizationContributorPolicyHandler } from './authorization/policies/handlers/organization-contributor-policy.handler';
import { PolicyHandlerStorage } from './authorization/policies/storage/policy-handler.storage';
import { RedisService } from './common/services/redis.service';
import jwtConfig from './config/jwt.config';
import { ApiKey } from './entities/api-key.entity';
import { Scope } from './entities/scope.entity';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([ApiKey, Scope]),
    UsersModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
    PolicyHandlerStorage,
    OrganizationContributorPolicyHandler,
    AccessTokenGuard,
    ApiKeyGuard,
    AuthenticationService,
    RefreshTokenIdsStorage,
    ApiKeyService,
    GoogleAuthenticationService,
    OtpAuthenticationService,
    UserSerializer,
    SessionAuthenticationService,
    RedisService,
  ],
  controllers: [
    AuthenticationController,
    GoogleAuthenticationController,
    SessionAuthenticationController,
  ],
})
export class IamModule implements NestModule {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const redisClient = this.redisService.getClient();

    const store = new RedisStore({
      client: redisClient,
      prefix: 'session:',
    });

    consumer
      .apply(
        session({
          store,
          secret: this.configService.getOrThrow<string>('SESSION_SECRET'),
          resave: false,
          saveUninitialized: false,
          cookie: {
            secure: this.configService.get('NODE_ENV') === 'production',
            httpOnly: true,
            sameSite: 'lax',
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
