import {
  ConflictException,
  Injectable,
  OnModuleInit,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauth2Client: OAuth2Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  onModuleInit() {
    this.oauth2Client = new OAuth2Client({
      clientId: this.configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
      redirectUri: this.configService.get('GOOGLE_REDIRECT_URI'),
    });
  }

  async authenticate(
    token: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
    const ticket = await this.oauth2Client.verifyIdToken({
      idToken: token,
      audience: this.configService.get('GOOGLE_CLIENT_ID'),
    });

    const { email, sub: googleId } =
      ticket.getPayload() as unknown as TokenPayload;
    if (!email || !googleId) {
      throw new UnauthorizedException('Invalid token');
    }

    let user = await this.usersService.findByGoogleId(googleId);
    if (!user) {
      user = await this.usersService.create({
        email,
        googleId,
      });
    }

      return this.authenticationService.generateTokens(user);
    } catch (error) {

      const pgUniqueViolationError = error.code === '23505';
      if (pgUniqueViolationError) {
        throw new ConflictException('User already exists');
      }

      throw new UnauthorizedException('Failed to authenticate user');
    }
  }
}
