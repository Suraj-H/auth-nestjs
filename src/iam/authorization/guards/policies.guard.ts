import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUEST_USER_KEY } from '../../iam.constants';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';
import { POLICIES_KEY } from '../decorators/policies.decorator';
import { Policy } from '../policies/interfaces/policy.interface';
import { PolicyHandlerStorage } from '../policies/storage/policy-handler.storage';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly policyHandlerStorage: PolicyHandlerStorage,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPolicies = this.reflector.getAllAndOverride<Policy[]>(
      POLICIES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPolicies) return true;

    const user: ActiveUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];

    await Promise.all(
      requiredPolicies.map((policy) => {
        const policyHandler = this.policyHandlerStorage.getHandler(
          policy.constructor as Type<Policy>,
        );
        return policyHandler?.handle(policy, user);
      }),
    ).catch((error) => {
      throw new ForbiddenException(error.message);
    });

    return true;
  }
}
