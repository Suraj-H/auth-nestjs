import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enum';

export const AUTH_TYPE_KEY = 'authType';

export const Auth = (...types: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, types);
