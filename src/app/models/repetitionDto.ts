import {Creneau} from './creneau';
import {Event} from './event';
import {Periode} from './periode';

export interface RepetitionDto {
  id?: number
  eventId: number
  periodeId: number
  jourOrder: number
  creaneauOrder: number;
}
