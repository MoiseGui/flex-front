import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Observable} from 'rxjs';
import swal from 'sweetalert2';
import {EtudiantFacade} from '../../facades/etudiant.facade';
import {FiliereFacade} from '../../facades/filiere.facade';
import {Etudiant} from '../../models/etudiant';
import {Filiere} from '../../models/filiere';
import {Professeur} from '../../models/professeur';
import {Modal} from '../../shared/ui/modal.service';
import {AddFiliereComponent} from '../filiere/add-filiere/add-filiere.component';
import {CrupdateEtudiantModalComponent} from './crupdate-etudiant-modal/crupdate-etudiant-modal.component';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  etudiants$: Observable<Etudiant[]>;

  editing = {};

  // utilisé pour l'affichage dans le html
  rows = [];

  // sera utilisé pour la recherche
  temp = [];
  title: string;

  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private etudiantFacade: EtudiantFacade,
    private modal: Modal,
  ) {
    this.activatedRoute.data.subscribe(data => {
      this.title = data.title;
    });
  }

  ngOnInit() {
    this.etudiants$ = this.etudiantFacade.getEtudiants$();
    this.etudiants$.subscribe((etudiants) => {
      this.rows = etudiants;
    });
  }

  showCrupdateEtudiant(etudiant?: Etudiant) {
    this.modal.show(CrupdateEtudiantModalComponent, {etudiant}).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
    });
  }

  updateFilter($event: KeyboardEvent) {

  }

  updateValue($event, nom: string, rowIndex: any) {

  }

  removeEtudinat(value: number) {
    console.log(value);
    this.confirmDelete(value);
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
        this.etudiantFacade.deleteEtudiant(id);
        // swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    });
  }

}
