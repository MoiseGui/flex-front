import {Router} from '@angular/router';
import {ProfileFacade} from './../../facades/profile.facade';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import swal from 'sweetalert2';
import {Modal} from '../../shared/ui/modal.service';
import {CrupdateProfileModalComponent} from './crupdate-profile-modal/crupdate-profile-modal.component';
import {Profile} from 'src/app/models/profile';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ProfileDetailComponent} from './profile-detail/profile-detail.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profiles$: Observable<Profile[]>;

  editing = {};

  public title: string = '';

  // utilisé pour l'affichage dans le html
  rows = [];
  // sera utilisé pour la recherche
  temp = [];
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modal: Modal,
    private profileFacade: ProfileFacade,
    private router: Router,
  ) {
    //Get the title of the page from the routing
    this.activatedRoute.data.subscribe(data => {
      this.title = data.title;
    });
  }

  ngOnInit() {
    this.profiles$ = this.profileFacade.getProfiles$();

    // Fill the rows with the rooms
    this.profiles$.subscribe(profs => {
      this.rows = profs;
      this.temp = profs;
      console.log('Les données', this.rows);
    });

    // whenever there is an error
    this.profileFacade.getError$().subscribe(message => {
      // "" means there is no error
      if (message != '') {
        // alert(message);
        this.alertErrorMessage(message);
        // seet no error after handling the error
        this.profileFacade.setError('');
      }
    });
  }

  showCrupdateProfile(profil?: Profile) {
    this.modal.show(CrupdateProfileModalComponent, {profil}).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      // this.refreshCompany();
    });
  }

  alertErrorMessage(message: string) {
    alertFunctions.typeError(message);
  }

  updateFilter(event) {
    console.log('value', event);
  }

  removeProfile(id: number) {
    this.confirmDelete(id);
  }

  showProfile(id: number) {
    const profile = this.rows.filter(function(item) {
      return (item.id === id);
    });
    this.modal.show(ProfileDetailComponent, {profile}).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
    });
  }

  // used to sure Yes for True and No for False
  yesOrNo(value): string {
    return value == true ? 'Yes' : 'No';
  }

  confirmDelete(id: number) {
    swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // If confirmed
      if (result.value) {
        this.profileFacade.removeProfile(id);
      }
    });
  }

}
