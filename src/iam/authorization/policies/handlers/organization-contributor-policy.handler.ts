import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from '../../../../users/enums/role.enum';
import { ActiveUserData } from '../../../interfaces/active-user-data.interface';
import { PolicyHandler } from '../interfaces/policy-handler.interface';
import { PolicyHandlerStorage } from '../storage/policy-handler.storage';
import { OrganizationContributorPolicy } from '../types/organization-contributor.policy';

@Injectable()
export class OrganizationContributorPolicyHandler implements PolicyHandler<OrganizationContributorPolicy> {
  constructor(private readonly policyHandlerStorage: PolicyHandlerStorage) {
    this.policyHandlerStorage.addHandler(OrganizationContributorPolicy, this);
  }

  async handle(
    policy: OrganizationContributorPolicy,
    user: ActiveUserData,
  ): Promise<void> {
    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException('You are not an admin.');
    }

    const isContributor = user.email.endsWith('@organization.com');
    if (!isContributor) {
      throw new ForbiddenException('You are not an organization contributor.');
    }
  }
}
