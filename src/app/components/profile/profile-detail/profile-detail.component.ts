import { ProfileFacade } from './../../../facades/profile.facade';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  profile: Profile;
  constructor(
    private route: ActivatedRoute,
    private profileFacade: ProfileFacade
  ) { }

  ngOnInit() {
    this.profile = history.state.data;
    console.log("recived", this.profile);
  }

}
