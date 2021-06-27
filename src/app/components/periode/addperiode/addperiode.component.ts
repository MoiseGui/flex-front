import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject} from 'rxjs';
import {PerdiodFacade} from '../../../facades/perdiod.facade';
import {ProfesseurFacade} from '../../../facades/professeur.facade';
import {Etudiant} from '../../../models/etudiant';
import {Periode} from '../../../models/periode';
import {Professeur} from '../../../models/professeur';
import {NGXToastrService} from '../../../shared/toastr/toastr.service';
import {Modal} from '../../../shared/ui/modal.service';

export interface CrupdatePeriodeModalData {
  perdiod: Periode;
  // selects:SelectOptionLists;
}

@Component({
  selector: 'app-addperiode',
  templateUrl: './addperiode.component.html',
  styleUrls: ['./addperiode.component.scss']
})
export class AddperiodeComponent implements OnInit {

  public form = this.fb.group({
    libelle: [''],
    dateDeb: [''],
    dateFin: [''],
  });
  public loading$ = this.periodeFacade.getLoading$();
  public errors$ = new BehaviorSubject<Partial<Professeur>>({});

  constructor(
    private modal: Modal,
    private fb: FormBuilder,
    private periodeFacade: PerdiodFacade,
    private toastService: NGXToastrService,
    private dialogRef: MatDialogRef<AddperiodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CrupdatePeriodeModalData,
  ) {
    this.periodeFacade.setLoading(false);
    this.resetState();
  }

  ngOnInit() {
    this.resetState();
    // if (this.data.perdiod) {
    //   this.form.patchValue(this.data.perdiod);
    // }
    console.log(this.data);
  }

  public close(data?: Periode) {
    this.resetState();
    this.dialogRef.close(data);
  }

  private resetState() {
    this.form.reset();
    this.errors$.next({});
  }

  confirm() {
    const period: Periode = this.form.value;
    this.periodeFacade.setLoading(true);
    this.periodeFacade.addperiode(period).subscribe((response) => {
      if (response === 'Ok') {
        this.toastService.typeSuccess('Period added successfully');
        this.close();
      } else {
        this.toastService.typeError(response);
      }
    }, (error) => {
      this.toastService.typeError(error);
    });
  }

}
