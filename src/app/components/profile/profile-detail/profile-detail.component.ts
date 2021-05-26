import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {BehaviorSubject, Observable} from 'rxjs';
import {FiliereFacade} from '../../../facades/filiere.facade';
import {ProfesseurFacade} from '../../../facades/professeur.facade';
import {ProfileFacade} from '../../../facades/profile.facade';
import {Filiere} from '../../../models/filiere';
import {Professeur} from '../../../models/professeur';
import {Profile} from '../../../models/profile';
import {NGXToastrService} from '../../../shared/toastr/toastr.service';
import {Modal} from '../../../shared/ui/modal.service';
import {CrupdateProfesseurModalData} from '../crupdate-profile-modal/crupdate-profile-modal.component';

export interface ProfileDetailComponentData {
  profil: Profile;
}

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})

export class ProfileDetailComponent implements OnInit {

  public loading$ = this.professeurFacade.getLoading$();
  public errors$ = new BehaviorSubject<Partial<Profile>>({});
  professeurs: Professeur[];
  filieres: Filiere[];
  panelOpenState: boolean = false;

  constructor(
    private modal: Modal,
    private fb: FormBuilder,
    private professeurFacade: ProfesseurFacade,
    private filiereFacade: FiliereFacade,
    private profileFacade: ProfileFacade,
    private toastService: NGXToastrService,
    private dialogRef: MatDialogRef<ProfileDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CrupdateProfesseurModalData,
  ) {
    this.professeurFacade.setLoading(false);
  }

  ngOnInit() {
    this.professeurs = this.data.profil[0].professeurs;
    this.filieres = this.data.profil[0].filieres;
    console.log('profs', this.professeurs);
    console.log('fils', this.filieres);
  }

  public close() {
    this.dialogRef.close(this.data);
  }

}
