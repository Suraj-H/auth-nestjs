import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { toFileStream } from 'qrcode';
import { ActiveUser } from '../decorators/active-user.decorator';
import type { ActiveUserData } from '../interfaces/active-user-data.interface';
import { AuthenticationService } from './authentication.service';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthType } from './enums/auth-type.enum';
import { OtpAuthenticationService } from './otp-authentication.service';

@Auth(AuthType.NONE)
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly otpAuthenticationService: OtpAuthenticationService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authenticationService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authenticationService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authenticationService.refreshToken(refreshTokenDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('2fa/generate')
  async generateQrCode(
    @ActiveUser() user: ActiveUserData,
    @Res() response: Response,
  ) {
    const { uri, secret } = this.otpAuthenticationService.generateSecret(
      user.email,
    );

    await this.otpAuthenticationService.enableTfaForUser(user.email, secret);

    return toFileStream(response, uri);
  }
}
