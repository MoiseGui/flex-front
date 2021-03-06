
import {Repetition} from './repetition';

export interface EventBase {
  id?: number;
  nom: string;
  desc: string;
  salleId: number;
  profiles: number[];
}

export interface Event extends EventBase {

  repetitions: Repetition[];
  // eventLogs: EventLog[];
}

export interface SpecialEvent extends EventBase {

  date: string;
  heureDeb: string;
  heureFin: string;
  activated: boolean;

}
