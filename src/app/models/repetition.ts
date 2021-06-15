import {Creneau} from './creneau';
import {Event} from './event';
import {Periode} from './periode';

export interface Repetition {

  id?: number
  event: Event
  periode: Periode
  jour: string
  creneau: Creneau;

}
