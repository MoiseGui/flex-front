import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Modal } from '../../shared/ui/modal.service';
import { CrupdateProfileModalComponent } from './crupdate-profile-modal/crupdate-profile-modal.component';
import { Profile } from 'src/app/models/profile';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title: string;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(
    private activatedRoute: ActivatedRoute,
    private modal: Modal,
  ) {
    //Get the title of the page from the routing
    this.activatedRoute.data.subscribe(data => {
      this.title = data.title;
    });
  }

  ngOnInit() {
  }
  showCrupdateProfile(profil?: Profile) {
    this.modal.show(CrupdateProfileModalComponent, { profil }).afterClosed().subscribe(data => {
      if (!data) return;
      // this.refreshCompany();
    });
  }

}
