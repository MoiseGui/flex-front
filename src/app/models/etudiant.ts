import {Filiere} from './filiere';
import {User} from './user';

export interface Etudiant extends User {
  cne: string;
  filierId: number;
  // setId(id:number){
  // this.filierId=id;
  //   }


}
