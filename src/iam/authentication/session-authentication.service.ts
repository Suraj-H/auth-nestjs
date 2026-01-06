import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { UnauthorizedException } from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';

export class SessionAuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
