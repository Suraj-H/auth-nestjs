import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../../users/entities/user.entity';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';

@Injectable()
export class UserSerializer extends PassportSerializer {
  serializeUser(
    user: User,
    done: (err: Error | null, user: ActiveUserData) => void,
  ) {
    done(null, {
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }

  deserializeUser(
    payload: ActiveUserData,
    done: (err: Error | null, user: ActiveUserData) => void,
  ) {
    done(null, payload);
  }
}
