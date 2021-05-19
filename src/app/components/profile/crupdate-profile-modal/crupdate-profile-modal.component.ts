import { Professeur } from './../../../models/professeur';
import { OnInit, Inject, Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Modal } from 'src/app/shared/ui/modal.service';
import { ProfesseurFacade } from 'src/app/facades/professeur.facade';
import { NGXToastrService } from 'src/app/shared/toastr/toastr.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { Profile } from 'src/app/models/profile';


export interface CrupdateProfesseurModalData {
  profile: Profile;
  // selects:SelectOptionLists;
}
@Component({
  selector: 'app-crupdate-profile-modal',
  templateUrl: './crupdate-profile-modal.component.html',
  styleUrls: ['./crupdate-profile-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrupdateProfileModalComponent implements OnInit {

  public form = this.fb.group({
    libelle: [''],
    filieres: [''],
    professeurs: [''],
    open: [false],
  });
  public loading$ = this.professeurFacade.getLoading$();
  public errors$ = new BehaviorSubject<Partial<Profile>>({});

  constructor(
    private modal: Modal,
    private fb: FormBuilder,
    private professeurFacade: ProfesseurFacade,
    private toastService: NGXToastrService,
    private dialogRef: MatDialogRef<CrupdateProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CrupdateProfesseurModalData,
  ) {
    this.professeurFacade.setLoading(false);
    this.resetState();
  }

  ngOnInit() {
    this.resetState();
    if (this.data.profile) {
      this.form.patchValue(this.data.profile);
    }
  }

  public close(data?: Professeur) {
    this.resetState();
    this.dialogRef.close(data);
  }

  public confirm() {
    console.log(this.form.value);
  }

  private resetState() {
    this.form.reset();
    this.errors$.next({});
  }

}
