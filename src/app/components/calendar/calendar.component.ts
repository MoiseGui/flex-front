import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, Inject, OnInit
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {ProfileFacade} from '../../facades/profile.facade';
import {SalleFacade} from '../../facades/salle.facade';
import {SpecialEventFacade} from '../../facades/special-event.facade';
import {Professeur} from '../../models/professeur';
import {Profile} from '../../models/profile';
import {Salle} from '../../models/salle';
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

  view: string = 'week';

  newEvent: CalendarEvent;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  ngOnInit() {
    this.sub_salles = this.salleFacade.getSalles$().subscribe((data) => {
      this.salles = data;
    });
    this.sub_profiles = this.sub_profiles = this.profileFacade.getProfiles$().subscribe((data) => {
      this.profiles = data;
    });
  }

  public salles: Array<Salle>;
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
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
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

  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private eventSFacade: SpecialEventFacade,
    private salleFacade: SalleFacade,
    private profileFacade: ProfileFacade,
    private toastService: NGXToastrService,
  ) {
    this.eventSFacade.setLoading(false);
    this.resetState();
  }

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
    this.events.push(this.newEvent);

    // this.refresh.next();
    this.handleEvent('Add new event', this.newEvent);
    this.refresh.next();
  }

  addSpecialEvent(): void {

  }
}

//Calendar event handler ends
