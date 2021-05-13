import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {ProfesseurFacade} from '../../../facades/professeur.facade';
import {Professeur} from '../../../models/professeur';
import {NGXToastrService} from '../../../shared/toastr/toastr.service';
import {Modal} from '../../../shared/ui/modal.service';

export interface CrupdateProfesseurModalData {
  professeur: Professeur;
  // selects:SelectOptionLists;
}

@Component({
  selector: 'app-crupdate-professeur-modal',
  templateUrl: './crupdate-professeur-modal.component.html',
  styleUrls: ['./crupdate-professeur-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrupdateProfesseurModalComponent implements OnInit {
  public form = this.fb.group({
    nom: [''],
    prenom: [''],
    email: [''],
    password: [''],
    admin: [false],
  });
  public loading$ = this.professeurFacade.getLoading$();
  public errors$ = new BehaviorSubject<Partial<Professeur>>({});

  constructor(
    private modal: Modal,
    private fb: FormBuilder,
    private professeurFacade: ProfesseurFacade,
    private toastService: NGXToastrService,
    private dialogRef: MatDialogRef<CrupdateProfesseurModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CrupdateProfesseurModalData,
  ) {
    this.professeurFacade.setLoading(false);
    this.resetState();
  }

  ngOnInit() {
    this.resetState();
    if (this.data.professeur) {
      this.form.patchValue(this.data.professeur);
    }
  }

  public close(data?: Professeur) {
    this.resetState();
    this.dialogRef.close(data);
  }

  public confirm() {
    this.professeurFacade.setLoading(true);

    // make sure there is no null value sent, specialy for boolean and model fields
    if(this.form.value.admin == null) this.form.value.admin = false;

    let request;
    if (this.data.professeur) {
      request = this.professeurFacade.updateProfesseur(this.data.professeur.id, this.form.value);
    } else {
      request = this.professeurFacade.addProfesseur(this.form.value);
    }

    request
      .pipe(finalize(() => this.professeurFacade.setLoading(false)))
      .subscribe(response => {
        if(response == "Ok"){
          if(this.data.professeur){
            this.toastService.typeSuccess(`Professor updated successfully`);
          }
          else{
            this.toastService.typeSuccess(`Professor added successfully`);
          }
          this.close(response);
        }
        else {
          this.toastService.typeError(response);
        }
      }, err => {
        this.professeurFacade.setLoading(false);
        this.errors$.next(err.messages);
      });
  }

  private resetState() {
    this.form.reset();
    this.errors$.next({});
  }
}
