import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/type/user.role';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
