import {Creneau} from './creneau';
import {Event} from './event';
import {Periode} from './periode';

export interface Repetition {

  id?: number
  event: Event
  periode: Periode
  jour: number
  creneau: Creneau;

}

export interface CalendarRepetition {

  id?: number
  event: Event
  periode: Periode
  jour: {
    id?: number
    nom: string
    ordre: number
  }
  creneau: Creneau;

}
