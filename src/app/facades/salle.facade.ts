import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import swal from 'sweetalert2';
import {Salle} from '../models/salle';
import {SalleService} from '../services/salle.service';
import {NGXToastrService} from '../shared/toastr/toastr.service';
import {SalleState} from '../states/salle.state';

@Injectable({
  providedIn: 'root'
})
export class SalleFacade {

  constructor(
    private salleService: SalleService,
    private salleState: SalleState,
    private toastService: NGXToastrService,
  ) {
    this.loadSalles();
  }

  loadSalles(){
    this.salleService.findAll().subscribe(salles => {
      // console.log("Depuis les facades", salles)
      this.salleState.setSalles(salles);
    });
  }

  getSalles$():Observable<Salle[]>{
    return this.salleState.getSalles$();
  }

  addSalles(nom: string): Observable<string> {
    let message = new Subject<string>();
    this.salleService.addSalle(nom).subscribe(response => {
      if(!response.nom){
        // this.setError(response.message);
        console.log(response)
        message.next(response.message);
      }
      else{
        this.salleState.addSalle(response)
        message.next("Ok");
      }
    }, error => {
      // console.log(error)
      message.next(error.error.message);
    });

    return message.asObservable();
  }

  addSallesDialog(title: string,
               input: "number" | "text" | "email" | "password" | "tel" | "range" | "textarea" | "select" | "radio" | "checkbox" | "file",
               facade: SalleFacade) {
    swal.fire({
      title: title,
      input: input,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,

      preConfirm: function (inputValue) {
        // console.log("Here we go")
        if(inputValue.length == 0) return new Promise(function (resolve, reject) {
          resolve("The name field should not be empty.");
        });
        return new Promise(function (resolve, reject) {
          facade.addSalles(inputValue).subscribe(message => {
            resolve(message);
          })
        });
      },
      allowOutsideClick: false
    }).then(function (message) {
      if(message.value == "Ok"){
        swal.fire({
          type: 'success',
          title: 'Success',
          html: `New class room added successfully`
        });
      }
      else{
        if(message.value){
          swal.fire({
            type: 'error',
            title: 'Error',
            html: message.value
          })
        }
      }

    }).catch(reason => {

    })
  }

  updatesalle(salle:Salle, old: Salle) {
    this.salleState.updateSalle(salle);
    return this.salleService.updateSalle(salle).subscribe(response => {
      if(!response.nom || response.nom != salle.nom){
        this.setError(response.message);
        // console.log("old",old)
        this.salleState.updateSalle(old);
      }
      else this.toastService.typeSuccess("Class room updated successfully");
    });
  }

  removeSalle(id: number){
    this.salleService.removeSalle(id).subscribe(response => {
        // console.log("reponse",response)
      if(response.nom){
        this.toastService.typeSuccess(`Class room ${response.nom} deleted successfully`);
        this.salleState.removeSalle(id);
      }
      else{
        this.setError(`An error has occurred while trying to delete the class room ${response.nom}`);
      }
    });
  }

  getError$(){
    return this.salleState.getError$();
  }

  setError(message){
    this.salleState.setError(message);
  }
}
