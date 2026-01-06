import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { UsersService } from '../../users/users.service';

@Injectable()
export class OtpAuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  generateSecret(email: string) {
    const secret = authenticator.generateSecret();
    const appName = this.configService.getOrThrow('TFA_APP_NAME');
    const uri = authenticator.keyuri(email, appName, secret);
    return {
      uri,
      secret,
    };
  }

  verifyToken(secret: string, token: string): boolean {
    return authenticator.verify({
      secret,
      token,
    });
  }

  async enableTfaForUser(email: string, secret: string) {
    const { id: userId } = await this.usersService.findByEmail(email, {
      id: true,
    });
    await this.usersService.update(userId, {
      tfaSecret: secret,
      isTfaEnabled: true,
    });
  }
}
