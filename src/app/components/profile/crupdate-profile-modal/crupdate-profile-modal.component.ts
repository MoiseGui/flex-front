import { ProfileFacade } from './../../../facades/profile.facade';
import { FiliereFacade } from './../../../facades/filiere.facade';
import { Filiere } from './../../../models/filiere';
import { Professeur } from './../../../models/professeur';
import { OnInit, Inject, Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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


  professeurs$: Observable<Professeur[]>;
  professeurs: Professeur[];
  filieres: Filiere[];
  filieres$: Observable<Filiere[]>;
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
    private filiereFacade: FiliereFacade,
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
    this.professeurs$ = this.professeurFacade.getProfesseurs$();
    this.filieres$ = this.filiereFacade.getfilieres$();

    // get all professeurs
    this.professeurs$.subscribe(profs => {
      this.professeurs = profs;
      // console.log("Les données",this.rows);
    });
    // get all filiers
    this.filieres$.subscribe(filieres => {
      this.filieres = filieres;
    })
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
