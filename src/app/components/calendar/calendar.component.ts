import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, Inject, OnInit
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
    private repService: RepetitionService,
    private salleFacade: SalleFacade,
    private profileFacade: ProfileFacade,
    private toastService: NGXToastrService,
  ) {
    this.eventSFacade.setLoading(false);
    this.resetState();
  }

  ngOnInit() {
    this.sub_salles = this.salleFacade.getSalles$().subscribe((data) => {
      this.salles = data;
    });
    this.sub_profiles = this.sub_profiles = this.profileFacade.getProfiles$().subscribe((data) => {
      this.profiles = data;
    });
    // handle event into calander
    this.event_facade.getEvents$().subscribe((events) => {
      if (events) {
        this.all_events = events;
        this.all_events.forEach(el => {
          console.log(el);
          if (el.repetitions[0]) {
            const id_rep: number = el.repetitions[0].id;
            if (id_rep) {
              this.repService.findById(id_rep).subscribe((rep) => {
                console.log('repetition', rep);
                let event_calendar: CalendarEvent = {
                  start: subDays(endOfMonth(rep.periode.dateDeb), 3),
                  end: addDays(endOfMonth(rep.periode.dateFin), 3),
                  title: rep.event.nom,
                  color: colors.blue
                };
                this.events.push(event_calendar);
              });
            }
          }
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
          let date = new Date(el.date);
          let hours_fin: number = +el.heureDeb.split(':')[0];
          let minute_fin: number = +el.heureDeb.split(':')[1];
          let new_start_date = new Date(date.setHours(hours_fin)).setMinutes(minute_fin);
          let date_ = new Date();
          date_.setDate(new_start_date);
          console.log(new_start_date);
          let event_calendar: CalendarEvent = {
            start: addHours(startOfDay(new Date(el.date)), 0),
            end: new Date(el.date),
            title: el.nom,
            color: colors.blue
          };
          this.events.push(event_calendar);
        });
        // {
        //   start: addHours(startOfDay(new Date()), 2),
        //     end: new Date(),
        //   title: 'A draggable and resizable event',
        //   color: colors.yellow,
        //   actions: this.actions,
        //   resizable: {
        //   beforeStart: true,
        //     afterEnd: true
        // },
        //   draggable: true
        // }
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
      //TRANSFORM DATE to "year-moi-day"
      this.specialEvent.date = moment(this.date_event_spec_start).format('YYYY-MM-DD');
      this.specialEvent.profiles = profileIds;
      this.specialEvent.salleId = +this.event_.salleId;
      this.specialEvent.heureDeb = this.date_event_spec_start.getHours() + ':' + this.date_event_spec_start.getMinutes();
      this.specialEvent.heureFin = this.date_event_spec_end.getHours() + ':' + this.date_event_spec_end.getMinutes();
      console.log(this.specialEvent);
      this.eventSFacade.addEvent(this.specialEvent).subscribe((res) => {
        if (res == 'Ok') {
          this.newEvent = {
            title: this.event_.nom,
            start: addHours(startOfDay(this.date_event_spec_start), 2),
            end: this.date_event_spec_end,
            color: colors.red.primary,
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            actions: this.actions,
          };
          this.events.push(this.newEvent);
          this.toastService.typeSuccess(`Event Added successfully`);
          this.modal.dismissAll();
          this.resete();
        } else {
          this.toastService.typeError(res);
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
