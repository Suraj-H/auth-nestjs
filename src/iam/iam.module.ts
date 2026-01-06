import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { RefreshTokenIdsStorage } from './authentication/storage/refresh-token-ids.storage';
import { PoliciesGuard } from './authorization/guards/policies.guard';
import { RoleGuard } from './authorization/guards/role.guard';
import { OrganizationContributorPolicyHandler } from './authorization/policies/handlers/organization-contributor-policy.handler';
import { PolicyHandlerStorage } from './authorization/policies/storage/policy-handler.storage';
import jwtConfig from './config/jwt.config';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';

@Module({
  imports: [
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
    AuthenticationService,
    RefreshTokenIdsStorage,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
