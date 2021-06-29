import {RepetitionFacade} from './../../facades/repetition.facade';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit
} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import * as events from 'events';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {EventFacade} from '../../facades/event.facade';
import {ProfileFacade} from '../../facades/profile.facade';
import {SalleFacade} from '../../facades/salle.facade';
import {SpecialEventFacade} from '../../facades/special-event.facade';
import {Professeur} from '../../models/professeur';
import {Profile} from '../../models/profile';
import {Repetition} from '../../models/repetition';
import {Salle} from '../../models/salle';
import {Event, SpecialEvent} from '../../models/event';
import {RepetitionService} from '../../services/repetition.service';
import {NGXToastrService} from '../../shared/toastr/toastr.service';
import {Modal} from '../../shared/ui/modal.service';
import {format} from 'date-fns';
import * as moment from 'moment';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarsComponent implements OnInit {
  @ViewChild('modalContent', {static: false}) modalContent: TemplateRef<any>;
  type_event: boolean = true;
  event_: Event = {
    nom: '',
    desc: '',
    salleId: 0,
    profiles: [],
    repetitions: [],
  };
  specialEvent: SpecialEvent = {
    nom: '',
    desc: '',
    salleId: 0,
    profiles: [],
    date: '',
    heureDeb: '',
    heureFin: '',
    activated: false
  };
  date_event_spec_start: Date = new Date();

  date_event_spec_end: Date = new Date();

  view: string = 'week';

  newEvent: CalendarEvent;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private eventSFacade: SpecialEventFacade,
    private event_facade: EventFacade,
    private repFacade: RepetitionFacade,
    private salleFacade: SalleFacade,
    private profileFacade: ProfileFacade,
    private toastService: NGXToastrService,
  ) {
    this.eventSFacade.setLoading(false);
    this.resetState();
    this.loadEvents();

    this.events$.subscribe(evs => {
      this.events = evs;
    });

    this.salleFacade.getSalles$().subscribe(salles => {
      this.salles = salles;
    });

    this.profileFacade.getProfiles$().subscribe(profils => {
      this.profiles = profils;
    });
  }

  ngOnInit() {
  }

  loadEvents() {
    // handle event into calander
    this.event_facade.getEvents$().subscribe((evs) => {
      if (evs) {
        evs.forEach(el => {
          console.log(el);
          el.repetitions.forEach(repetition => {
            if (repetition.id) {
              console.log('Rep_id ', repetition.id);
              const rep = this.repFacade.findById(repetition.id).subscribe(rep => {
                if (rep.id) {
                  console.log('repetition', rep);
                  // on doit être dans la période
                  const periode = rep.periode;

                  console.log('period ', periode);

                  const tabDeb = periode.dateDeb.split('/');
                  const tabFin = periode.dateFin.split('/');

                  let mois = (new Date().getMonth() + 1) + '';
                  mois = mois.length == 1 ? '0' + mois : mois;

                  let jour = new Date().getDate() + '';
                  jour = jour.length == 1 ? '0' + jour : jour;
                  const today = '' + new Date().getFullYear() + mois + jour;

                  const dateDeb = tabDeb[2] + tabDeb[1] + tabDeb[0];
                  const dateFin = tabFin[2] + tabFin[1] + tabFin[0];

                  if (today >= dateDeb && today <= dateFin) {
                    console.log('Dans la période..');

                    const today = new Date();

                    let eventDate = new Date(today.setDate(today.getDate() - today.getDay() + rep.jour.ordre));

                    let i = '';
                    // remplir le calendar sur toute la durée de la période
                    do {

                      const start = new Date(eventDate.setHours(+rep.creneau.heureDeb.split(':')[0], 0));
                      const end = new Date(eventDate.setHours(+rep.creneau.heureFin.split(':')[0], 0));

                      // console.log(start);

                      let event_calendar: CalendarEvent = {
                        start: start,
                        end: end,
                        title: rep.event.nom,
                        color: colors.blue
                      };
                      this.events$.next([...this.events, event_calendar]);
                      // this.events.push(event_calendar);

                      // next week
                      eventDate = new Date(eventDate.setDate(eventDate.getDate() + 7));

                      const y = eventDate.getFullYear() + '';
                      let m = eventDate.getMonth() + '';
                      m = m.length == 1 ? '0' + m : m + '';
                      let j = eventDate.getDate() + '';
                      j = j.length == 1 ? '0' + j : j + '';

                      i = y + m + j;

                      // console.log("i....", i)

                    } while (i <= dateFin);

                  } else {
                    console.log('Période dépassée...');
                  }

                } else {
                  console.log('Not Found...');
                }
              });

            }
          });
        });
      }

      // {
      //   start: subDays(endOfMonth(new Date()), 3),
      //     end: addDays(endOfMonth(new Date()), 3),
      //   title: 'A long event that spans 2 months',
      //   color: colors.blue
      // },

    });
    //  handle Special event  into calander
    this.eventSFacade.getEvents$().subscribe((eventSpecial) => {
      this.event_special = eventSpecial;
      if (this.event_special) {
        console.log('Special events :', this.event_special);
        this.event_special.forEach(el => {
          if (el.activated) {
            let dateDeb = new Date(el.date + 'T' + el.heureDeb);
            let dateFin = new Date(el.date + 'T' + el.heureFin);
            let event_calendar: CalendarEvent = {
              start: dateDeb,
              end: dateFin,
              title: el.nom,
              color: colors.red
            };
            this.events$.next([...this.events, event_calendar]);
            // this.events.push(event_calendar);
          }
        });
      }
    });
  }

  public salles: Array<Salle>;
  public all_events: Array<Event>;
  public eventSpecila: Array<SpecialEvent>;

  public profiles: Array<Profile>;
  public event_special: Array<SpecialEvent>;
  sub_salles: Subscription;
  sub_profiles: Subscription;
  public errors$ = new BehaviorSubject<Partial<Professeur>>({});

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edit this event', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        // this.handleEvent('This event is deleted!', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  events$ = new BehaviorSubject<CalendarEvent[]>([]);
  // events: CalendarEvent[] = [
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: new Date(),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }
  // ];

  activeDayIsOpen: boolean = true;

  private resetState() {
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  addEvent(): void {
    this.handleEvent('Add new event', this.newEvent);
    this.refresh.next();
  }

  // submit form add event
  confirm() {
    if (this.type_event) {
      console.log('event normal');
      let event: Event = this.event_;
      event.salleId = +this.event_.salleId;
      let profileIds: number[] = [];
      this.event_.profiles.forEach(el => {
        profileIds.push(+el);
      });
      event.profiles = profileIds;
      this.event_facade.addEvent(event).subscribe((res) => {
        if (res == 'Ok') {
          // this.newEvent = {
          //   title: this.event_.nom,
          //   start: startOfDay(this.date_event_spec_start),
          //   end: endOfDay(this.date_event_spec_start),
          //   color: colors.blue,
          //   draggable: true,
          //   resizable: {
          //     beforeStart: true,
          //     afterEnd: true
          //   },
          //   actions: this.actions,
          // };
          // this.events.push(this.newEvent);
          this.toastService.typeSuccess(`Event Added successfully`);
          this.modal.dismissAll();
          this.resete();
        } else {
          this.toastService.typeError(`${res}`);
        }
      });
    } else {
      this.specialEvent.nom = this.event_.nom;
      this.specialEvent.desc = this.event_.desc;
      let profileIds: number[] = [];
      this.event_.profiles.forEach(el => {
        profileIds.push(+el);
      });

      // TODO: la date ne change pas
      console.log('voici la date: ', this.date_event_spec_start);
      //TRANSFORM DATE to "year-mois-day"
      this.specialEvent.date = moment(this.date_event_spec_start).format('YYYY-MM-DD');
      this.specialEvent.profiles = profileIds;
      this.specialEvent.salleId = +this.event_.salleId;

      let startMin = this.date_event_spec_start.getMinutes() + '';
      startMin = startMin.length == 1 ? '0' + startMin : startMin;
      let endMin = this.date_event_spec_end.getMinutes() + '';
      endMin = endMin.length == 1 ? '0' + endMin : endMin;
      this.specialEvent.heureDeb = this.date_event_spec_start.getHours() + ':' + startMin;
      this.specialEvent.heureFin = this.date_event_spec_end.getHours() + ':' + endMin;
      console.log(this.specialEvent);
      this.eventSFacade.addEvent(this.specialEvent).subscribe((res) => {
        if (typeof res == 'string') {
          this.toastService.typeError(res);
        } else {
          const el = res;
          if (el.activated) {
            let dateDeb = new Date(el.date + 'T' + el.heureDeb);
            let dateFin = new Date(el.date + 'T' + el.heureFin);
            let event_calendar: CalendarEvent = {
              start: dateDeb,
              end: dateFin,
              title: el.nom,
              color: colors.red
            };
            this.events$.next([...this.events, event_calendar]);
            // this.events.push(event_calendar);
          }

          this.toastService.typeSuccess(`Event Added successfully`);
          this.modal.dismissAll();
          this.resete();
        }
      });
    }
  }

  resete() {
    this.event_ = new class implements Event {
      desc: string;
      id: number;
      nom: string;
      profiles: number[];
      repetitions: [];
      salleId: number;
    };
    this.specialEvent = new class implements SpecialEvent {
      activated: boolean;
      date: string;
      desc: string;
      heureDeb: string;
      heureFin: string;
      id: number;
      nom: string;
      profiles: number[];
      salleId: number;
    };
  }
}

//Calendar event handler ends
