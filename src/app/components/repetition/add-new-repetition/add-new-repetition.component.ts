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
  public errors$ = new BehaviorSubject<Partial<Professeur>>({});

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
    rep.periodeId = +rep.periodeId;
    rep.eventId = +rep.eventId;
    rep.jourOrder = +rep.jourOrder;
    rep.creaneauOrder = +rep.creaneauOrder;
    this.repetitionFacade.addRepetition(rep).subscribe((res) => {
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
  }
}
