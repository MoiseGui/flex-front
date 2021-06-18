import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ProfesseurFacade} from '../../../facades/professeur.facade';
import {ProfileFacade} from '../../../facades/profile.facade';
import {SalleFacade} from '../../../facades/salle.facade';
import {SpecialEventFacade} from '../../../facades/special-event.facade';
import {SpecialEvent} from '../../../models/event';
import {Professeur} from '../../../models/professeur';
import {Profile} from '../../../models/profile';
import {Salle} from '../../../models/salle';
import {NGXToastrService} from '../../../shared/toastr/toastr.service';
import {Modal} from '../../../shared/ui/modal.service';

@Component({
  selector: 'app-addnewevent',
  templateUrl: './addnewevent.component.html',
  styleUrls: ['./addnewevent.component.scss']
})
export class AddNewEventComponent implements OnInit {

  public form = this.fb.group({
    nom: [''],
    salleId: [''],
    profiles: [''],
    desc: [''],
    date: [''],
    heureDeb: {hour: 0o0, minute: 0o0},
    heureFin: {hour: 0o0, minute: 0o0},
    activated: [''],
  });
  public salles: Array<Salle>;
  public profiles: Array<Profile>;
  sub_salles: Subscription;
  sub_profiles: Subscription;
  public errors$ = new BehaviorSubject<Partial<Professeur>>({});
  date: { year: number, month: number };

  constructor(
    private modal: Modal,
    private fb: FormBuilder,
    private eventSFacade: SpecialEventFacade,
    private salleFacade: SalleFacade,
    private profileFacade: ProfileFacade,
    private toastService: NGXToastrService,
    private dialogRef: MatDialogRef<AddNewEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddNewEventComponent,
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
  }

  confirm() {
    const eventSpecial: SpecialEvent = this.form.value;
    const eventForm = this.form.value;
    let profiles_array: number[] = [];
    eventForm.profiles.forEach(el => {
      profiles_array.push(+el);
    });
    eventSpecial.salleId = +this.form.value.salleId;
    eventSpecial.profiles = [...profiles_array];
    eventSpecial.date = eventForm.date.year + '-' + eventForm.date.month + '-' + eventForm.date.day;
    eventSpecial.heureDeb = eventForm.heureDeb.hour + ':' + eventForm.heureDeb.minute;
    eventSpecial.heureFin = eventForm.heureFin.hour + ':' + eventForm.heureFin.minute;
    if (eventForm.activated == null) {
      eventSpecial.activated = false;
    }
    console.log(eventSpecial);
    this.eventSFacade.addEvent(eventSpecial).subscribe((response) => {
      console.log(response);
      if (response == 'Ok') {
        this.toastService.typeSuccess(`Special Even Added successfully`);
        this.close();
      } else {
        this.toastService.typeError(response);
      }
    }, err => {
      this.errors$.next(err.messages);
    });
  }

  private resetState() {
    this.form.reset();
    this.errors$.next({});
  }

  public close() {
    this.resetState();
    this.dialogRef.close();
  }

}
