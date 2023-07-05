import { UserRoles } from './user-roles.enum';

export interface User {
  username: string;
  personalIdentificationNumber: string;
  role: UserRoles;
}
