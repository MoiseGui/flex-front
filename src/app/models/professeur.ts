import { User } from './user';

export interface Professeur extends User {
  admin: boolean;
}
