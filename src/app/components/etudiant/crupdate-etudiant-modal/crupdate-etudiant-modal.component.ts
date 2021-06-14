import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import {EtudiantFacade} from '../../../facades/etudiant.facade';
import {FiliereFacade} from '../../../facades/filiere.facade';
import {ProfesseurFacade} from '../../../facades/professeur.facade';
import {ProfileFacade} from '../../../facades/profile.facade';
import {Etudiant} from '../../../models/etudiant';
import {Filiere} from '../../../models/filiere';
import {Professeur} from '../../../models/professeur';
import {Profile} from '../../../models/profile';
import {NGXToastrService} from '../../../shared/toastr/toastr.service';
import {Modal} from '../../../shared/ui/modal.service';
import {CrupdateProfesseurModalData} from '../../profile/crupdate-profile-modal/crupdate-profile-modal.component';

export interface CrupdateEtudiantModalData {
  etudiant: Etudiant;
  // selects:SelectOptionLists;
}

@Component({
  selector: 'app-crupdate-etudiant-modal',
  templateUrl: './crupdate-etudiant-modal.component.html',
  styleUrls: ['./crupdate-etudiant-modal.component.scss']
})
export class CrupdateEtudiantModalComponent implements OnInit {

  public loading$ = this.etudiantFacade.getLoading$();
  public errors$ = new BehaviorSubject<Partial<Etudiant>>({});
  filieres$: Observable<Filiere[]>;

  constructor(
    private modal: Modal,
    private fb: FormBuilder,
    private filiereFacade: FiliereFacade,
    private etudiantFacade: EtudiantFacade,
    private toastService: NGXToastrService,
    private dialogRef: MatDialogRef<CrupdateEtudiantModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CrupdateEtudiantModalData,
  ) {
    this.etudiantFacade.setLoading(false);
    this.resetState();
  }

  public form = this.fb.group({
    nom: [''],
    prenom: [''],
    email: [''],
    cne: [''],
    filierId: [0],
  });

  ngOnInit() {
    this.filieres$ = this.filiereFacade.getfilieres$();
    console.log(this.data.etudiant);
  }

  // public close(data?: Etudiant) {
  //   this.resetState();
  //   this.dialogRef.close(data);
  // }

  private resetState() {

  }

  public close(data?: Etudiant) {
    this.resetState();
    this.dialogRef.close(data);
  }

  confirm() {
    const etudiant: Etudiant = this.form.value;
    etudiant.filierId = +this.form.value.filierId;
    this.etudiantFacade.setLoading(true);
    this.etudiantFacade.addEtudiant(etudiant).subscribe((response) => {
      if (response === 'Ok') {
        this.toastService.typeSuccess('Student added successfully');
        this.close();
      } else {
        this.toastService.typeError(response);
      }

    }, (error) => {
      this.toastService.typeError(error);
    });
  }
}
