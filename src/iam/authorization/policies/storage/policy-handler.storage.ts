import { Injectable, NotFoundException, Type } from '@nestjs/common';
import { Policy } from '../interfaces/policy.interface';
import { PolicyHandler } from '../interfaces/policy-handler.interface';

@Injectable()
export class PolicyHandlerStorage {
  private readonly handlers: Map<Type<Policy>, PolicyHandler<any>> = new Map();

  addHandler<T extends Policy>(policyType: Type<T>, handler: PolicyHandler<T>) {
    this.handlers.set(policyType, handler);
  }

  getHandler<T extends Policy>(
    policyType: Type<T>,
  ): PolicyHandler<T> | undefined {
    const handler = this.handlers.get(policyType);
    if (!handler)
      throw new NotFoundException(
        `Policy ${policyType.name} does not have the associated handler.`,
      );
    return handler;
  }
}
