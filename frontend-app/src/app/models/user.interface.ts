import { UserRoles } from './user-roles.enum';

export interface User {
  familyName: string;
  givenName: string;
  email: string;
  personalIdentificationNumber: string;
  role: UserRoles;
}
