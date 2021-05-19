import { NGXToastrService } from './../shared/toastr/toastr.service';
import { ProfileState } from './../states/profile.state';
import { ProfileService } from './../services/profile.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileFacade {

  constructor(
    private profileServices: ProfileService,
    private profileState: ProfileState,
    private toastService: NGXToastrService,
  ) {
    this.loadProfiles();
  }

  loadProfiles() {
    // this.profileServices.findAll().subscribe(filieres => {
    //   this.profileState.setFilieres(filieres);
    // })
  }
}
