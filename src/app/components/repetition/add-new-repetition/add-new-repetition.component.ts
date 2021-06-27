import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject} from 'rxjs';
import {EventFacade} from '../../../facades/event.facade';
import {PerdiodFacade} from '../../../facades/perdiod.facade';
import {ProfesseurFacade} from '../../../facades/professeur.facade';
import {RepetitionFacade} from '../../../facades/repetition.facade';
import {Creneau} from '../../../models/creneau';
import {Event} from '../../../models/event';
import {Jour} from '../../../models/Jour';
import {Periode} from '../../../models/periode';
import {Professeur} from '../../../models/professeur';
import {Repetition} from '../../../models/repetition';
import {RepetitionDto} from '../../../models/repetitionDto';
import {CreneauService} from '../../../services/creneau.service';
import {JourService} from '../../../services/jour.service';
import {PeriodeService} from '../../../services/periode.service';
import {NGXToastrService} from '../../../shared/toastr/toastr.service';
import {Modal} from '../../../shared/ui/modal.service';
import {CrupdateProfesseurModalData} from '../../professeur/crupdate-professeur-modal/crupdate-professeur-modal.component';

export interface CrupdateModalData {
  repetition: Repetition;
  // selects:SelectOptionLists;
}

@Component({
  selector: 'app-add-new-repetition',
  templateUrl: './add-new-repetition.component.html',
  styleUrls: ['./add-new-repetition.component.scss']
})
export class AddNewRepetitionComponent implements OnInit {

  public form = this.fb.group({
    eventId: [''],
    periodeId: [''],
    jourOrder: [''],
    creaneauOrder: [''],
  });
  public all_events: Array<Event>;
  public all_crenaux: Array<Creneau>;
  public periode: Array<Periode>;
  public jours: Array<Jour>;
  public errors$ = new BehaviorSubject<Partial<Repetition>>({});

  constructor(
    private modal: Modal,
    private fb: FormBuilder,
    private crenauxFacade: CreneauService,
    private eventFacade: EventFacade,
    private repetitionFacade: RepetitionFacade,
    private perdiodFacade: PerdiodFacade,
    private jourService: JourService,
    private toastService: NGXToastrService,
    private dialogRef: MatDialogRef<AddNewRepetitionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CrupdateModalData,
  ) {
    this.repetitionFacade.setLoading(false);
    this.resetState();
  }

  event_selected: Event;
  period_selected: Periode;
  crenaux_selected: Creneau;
  jour: Jour;

  ngOnInit() {
    this.resetState();
    if (this.data.repetition) {
      this.form.patchValue(this.data.repetition);
    }
    this.eventFacade.getEvents$().subscribe((events) => {
      this.all_events = events;
    });
    this.crenauxFacade.findAll().subscribe((crenaux) => {
      this.all_crenaux = crenaux;
    });
    this.perdiodFacade.gettPeriods$().subscribe((periodes) => {
      this.periode = periodes;
    });
    this.jourService.findAll().subscribe((jours) => {
      this.jours = jours;
    });
    if (this.data.repetition) {
      this.event_selected = this.data.repetition.event;
      this.period_selected = this.data.repetition.periode;
      this.crenaux_selected = this.data.repetition.creneau;
      // this.jour = this.data.repetition.jour;
    }
    console.log(this.data.repetition);

  }

  public close(data?: any) {
    this.resetState();
    this.dialogRef.close(data);
  }

  private resetState() {
    this.form.reset();
    this.errors$.next({});
  }

  public confirm() {
    let rep: RepetitionDto = this.form.value;
    if (!this.data.repetition) {
      const event: Event = {
        desc: '', nom: '', profiles: [], repetitions: [], salleId: 0,
        id: +rep.eventId
      };
      const crenaux: Creneau = {
        heureDeb: '', heureFin: '', id: +rep.creaneauOrder, ordre: +rep.creaneauOrder
      };
      const period: Periode = {
        dateDeb: '', dateFin: '', id: +rep.periodeId, libelle: ''
      };
      let repetition: Repetition =
        {
          creneau: crenaux, event: event, jour: +rep.jourOrder, periode: period
        };
      this.repetitionFacade.addRepetition(repetition).subscribe((res) => {
        if (res == 'Ok') {
          if (this.data.repetition) {
            this.toastService.typeSuccess(`Repetition updated successfully`);
          } else {
            this.toastService.typeSuccess(`Repetition added successfully`);
          }
          this.close(res);
        } else {
          this.toastService.typeError(res);
        }
      });
    } else {

    }

  }
}
