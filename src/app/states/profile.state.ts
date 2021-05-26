import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Profile} from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileState {

  private profiles$ = new BehaviorSubject<Profile[]>(null);
  private loading$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<string>('');

  constructor() {
  }

  getProfiles$() {
    return this.profiles$.asObservable();
  }

  setProfiles(profiles: Profile[]) {
    this.profiles$.next(profiles);
  }

  addProfile(profile: Profile) {
    const profiles = this.profiles$.getValue();

    if (profiles == null) {
      this.profiles$.next(new Array(profile));
    } else {
      this.profiles$.next([...profiles, profile]);
    }
  }

  updateProfile(id: number, profile: Profile) {
    // get value of profile observable
    const profiles = this.profiles$.getValue();

    // foreach can't get the job done

    // changer existance profile with a new profile
    //
    for (let i = 0; i < profiles.length; i++) {
      if (profiles[i].id == profile.id) {
        profiles[i] = profile;
      }
    }

    // ajouter new data profile to obserable
    this.profiles$.next([...profiles]);
  }

  deleteProfile(id: number) {
    let profiles = this.profiles$.getValue();

    profiles = profiles.filter(profile => profile.id != id);

    this.profiles$.next([...profiles]);
  }

  isLoading$() {
    return this.loading$.asObservable();
  }

  setLoading(value: boolean) {
    this.loading$.next(value);
  }

  setError(message) {
    this.error$.next(message);
  }

  getError$() {
    return this.error$;
  }

}
