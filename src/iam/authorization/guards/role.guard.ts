import {
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../../users/enums/role.enum';
import { REQUEST_USER_KEY } from '../../iam.constants';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) return true;

    const user: ActiveUserData = context.switchToHttp().getRequest()[REQUEST_USER_KEY];
    return requiredRoles.some((role) => user.role === role);
  }

}
