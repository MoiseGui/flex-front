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
import {NGXToastrService} from '../../shared/toastr/toastr.service';
import {Modal} from '../../shared/ui/modal.service';

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
    this.event_facade.getEvents$().subscribe((events) => {
      this.all_events = events;
      console.log(this.all_events);
      // {
      //   start: subDays(endOfMonth(new Date()), 3),
      //     end: addDays(endOfMonth(new Date()), 3),
      //   title: 'A long event that spans 2 months',
      //   color: colors.blue
      // },
      this.all_events.forEach(el => {
        let event_calendar: CalendarEvent = {
          start: subDays(endOfMonth(new Date()), 3),
          end: addDays(endOfMonth(new Date()), 3),
          title: 'A long event that spans 2 months',
          color: colors.blue
        };
      });

    });
  }

  public salles: Array<Salle>;
  public all_events: Array<Event>;
  public eventSpecila: Array<SpecialEvent>;

  public profiles: Array<Profile>;
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

  events: CalendarEvent[] = [
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

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
    this.newEvent = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      actions: this.actions,
    };
    // this.refresh.next();
    this.handleEvent('Add new event', this.newEvent);
    this.refresh.next();
  }

  addSpecialEvent(): void {

  }

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
          this.newEvent = {
            title: this.event_.nom,
            start: startOfDay(this.modalData.event.start),
            end: endOfDay(this.modalData.event.end),
            color: colors.blue,
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
          this.toastService.typeError(`${res}`);
        }
      });
    } else {
      let specilEvent: SpecialEvent = this.specialEvent;
      specilEvent.nom = this.event_.nom;
      specilEvent.desc = this.event_.desc;
      specilEvent.profiles = this.event_.profiles;
      specilEvent.salleId = this.event_.salleId;
      console.log(specilEvent);
      console.log(specilEvent);
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
  }
}

//Calendar event handler ends
