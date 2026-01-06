import { Role } from '../../users/enums/role.enum';

export interface ActiveUserData {
  sub: number;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}
