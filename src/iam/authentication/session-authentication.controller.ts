import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { promisify } from 'util';
import { ActiveUser } from '../decorators/active-user.decorator';
import type { ActiveUserData } from '../interfaces/active-user-data.interface';
import { SignInDto } from './dto/sign-in.dto';
import { SessionGuard } from './guards/session.guard';
import { SessionAuthenticationService } from './session-authentication.service';

@Controller('auth/session')
export class SessionAuthenticationController {
  constructor(
    private readonly sessionAuthenticationService: SessionAuthenticationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Req() request: Request, @Body() signInDto: SignInDto) {
    const user = await this.sessionAuthenticationService.signIn(signInDto);
    await promisify(request.login).call(request, user);
  }

  @UseGuards(SessionGuard)
  @Get('me')
  async me(@ActiveUser() user: ActiveUserData ) {
    return { email: user.email };
  }
}
