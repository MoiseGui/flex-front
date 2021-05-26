import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Filiere } from 'src/app/models/filiere';
import swal from 'sweetalert2';
import { FiliereService } from '../services/filiere.service';
import { NGXToastrService } from '../shared/toastr/toastr.service';
import { FiliereState } from '../states/filiere.state';

@Injectable({
    providedIn: 'root',
})
export class FiliereFacade {
    constructor(
        private filiereService: FiliereService,
        private filiereState: FiliereState,
        private toastService: NGXToastrService,
    ) {
        this.loadFilieres();
    }

    public loadFilieres() {
        this.filiereService.findAll().subscribe((filieres) => {
            this.filiereState.setFilieres(filieres);
        });
    }

    public getfilieres$(): Observable<Filiere[]> {
        return this.filiereState.getFiliere$();
    }

    public addFiliere(nom: string): Observable<string> {
        const message = new Subject<string>();
        this.filiereService.addfiliere(nom).subscribe((response) => {
            // console.log("Response",response.message)
            if (response.id) {
                this.filiereState.addFiliere(response);
                message.next('Ok');
            } else {
                message.next(response.message);
            }
        }, (error) => {
            this.setLoading(false);
            message.next(this.handleError(error));
        });

        return message;
    }
  // tslint:disable-next-line:max-line-length
    public addFiliereDialog(title: string, input: 'number' | 'text' | 'email' | 'password' | 'tel' | 'range' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file',
                            facade: FiliereFacade) {
        swal.fire({
            title,
          // tslint:disable-next-line:object-literal-sort-keys
            input,
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,

            preConfirm(inputValue) {
                // console.log("Here we go"
              // tslint:disable-next-line:only-arrow-functions
                if (inputValue.length === 0) { return new Promise(function(resolve, reject) {
                    resolve('The name field should not be empty.');
                });
                }
              // tslint:disable-next-line:only-arrow-functions
                return new Promise(function(resolve, reject) {
                    facade.addFiliere(inputValue).subscribe((message) => {
                        resolve(message);
                    });
                });
            },
            allowOutsideClick: false,
          // tslint:disable-next-line:only-arrow-functions
        }).then(function(message) {
            if (message.value === 'Ok') {
                swal.fire({
                    type: 'success',
                  // tslint:disable-next-line:object-literal-sort-keys
                    title: 'Success',
                    html: `New Branch  added successfully`,
                });
            } else {
                if (message.value) {
                    swal.fire({
                        type: 'error',
                      // tslint:disable-next-line:object-literal-sort-keys
                        title: 'Error',
                        html: message.value,
                    });
                }
            }

        }).catch((reason) => {

        });
    }

    public removeFiliere(id: number) {
        this.filiereService.removefiliere(id).subscribe((response) => {
            if (response.nom) {
                this.toastService.typeSuccess(`Filiere ${response.nom} deleted successfully`);
                this.filiereState.removeFiliere(id);
            } else {
                this.toastService.typeError(response.message);
            }
        });
    }
    public updateFiliere(filiere: Filiere, old: Filiere) {
        if (filiere.nom === old.nom) {
            this.toastService.typeInfo('No Data To update');
        } else {
            return this.filiereService.updatefiliere(filiere).subscribe((response) => {
                if (!response.nom || response.nom !== filiere.nom) {
                    this.setError(response.message);
                    this.filiereState.updateFiliere(old);
                } else {
                    this.filiereState.updateFiliere(filiere);
                    this.toastService.typeSuccess('Branch  updated successfully');
                }
              // tslint:disable-next-line:no-unused-expression
                ((error) => {
                    this.setError(error.message);
                    this.filiereState.updateFiliere(old);
                });
            });
        }

    }

    public handleError(error: any): string {
        let text = '';
        for (let i = 0; i < error.error.message.length; i++) {
          // tslint:disable-next-line:triple-equals max-line-length
            if  (i == error.error.message.length - 1) { text += `${error.error.message[i]}`; } else {  text += `${error.error.message[i]} | `; }
        }
        return text;
    }

    public getError$() {
        return this.filiereState.getError$();
    }

    public setError(message) {
        this.filiereState.setError(message);
    }

    public getLoading$() {
        return this.filiereState.isLoading$();
    }

    public setLoading(value: boolean) {
        this.filiereState.setLoading(value);
    }
}
