import { ValidRoles } from 'src/auth/interfaces';

export type UserRole = {
  id: number;
  email: string;
  isActive: boolean;
  roleNames: ValidRoles[];
};
