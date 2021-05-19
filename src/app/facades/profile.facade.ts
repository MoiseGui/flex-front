import { NGXToastrService } from '../shared/toastr/toastr.service';
import { ProfileState } from '../states/profile.state';
import { ProfileService } from '../services/profile.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Profile } from '../models/profile' 

@Injectable({
  providedIn: 'root'
})
export class ProfileFacade {

  constructor(
    private profileService: ProfileService,
    private profileState: ProfileState,
  ) { 
    this.loadProfiles();
  }

  loadProfiles() {
    this.profileService.findAll().subscribe(profiles => {
      this.profileState.setProfiles(profiles);
    })
  }

  getProfiles$(): Observable<Profile[]> {
    return this.profileState.getProfiles$();
  }

  
  addProfile(profile: Profile): Observable<String> {

    let message = new Subject<string>();

    // api call
    this.profileService.addProfile(profile).subscribe( res => {

      // add the profile to the state
      if(res.id) {  
        this.profileState.addProfile(res);
        // show success message
        message.next("Profile added successfully.");
      } else {
        // show api error message !
        message.next(res.message)
      }

    }, err => {
        // in case of api call errors
        // stop the loading
        this.setLoading(false);
        // show api call error
        message.next(this.handleError(err));
    })

    return message;
  }

  handleError(error: any): string{
    let text = "";

    if (typeof error.error.message == 'string') {
      text = error.error.message;
    }
    else {
      for (let i = 0; i < error.error.message.length; i++) {
        if (i == error.error.message.length - 1) text += `${error.error.message[i]}`
        else text += `${error.error.message[i]} | `
      }
    }
    return text;
  }


  getError$() {
    return this.profileState.getError$();
  }

  setError(message) {
    this.profileState.setError(message);
  }

  getLoading$() {
    return this.profileState.isLoading$();
  }

  setLoading(value: boolean) {
    this.profileState.setLoading(value);
  }
}
