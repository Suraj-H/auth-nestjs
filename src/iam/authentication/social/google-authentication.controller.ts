import { Body, Controller, Post } from '@nestjs/common';
import { GoogleTokenDto } from '../dto/google-token.dto';
import { GoogleAuthenticationService } from './google-authentication.service';

@Controller('auth/social/google')
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post()
  async authenticate(@Body() googleTokenDto: GoogleTokenDto) {
    return this.googleAuthenticationService.authenticate(googleTokenDto.token);
  }
}
