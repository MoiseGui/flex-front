import { Filiere } from './filiere';
import { User } from './user';

export interface Etudiant extends User {
    cne: string;
    filiere: Filiere;
}
