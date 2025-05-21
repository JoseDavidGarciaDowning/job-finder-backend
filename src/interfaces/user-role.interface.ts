import { ValidRoles } from 'src/auth/interfaces';

export type UserRole = {
  id: string;
  email: string;
  isActive: boolean;
  roleNames: ValidRoles[];
};
