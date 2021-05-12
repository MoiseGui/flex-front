import { Filiere } from 'src/app/models/filiere';
import { Observable, Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { FiliereService } from '../services/filiere.service';
import swal from 'sweetalert2';
import { FiliereState } from '../states/filiere.state';
import { NGXToastrService } from '../shared/toastr/toastr.service';

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

    loadFilieres() {
        this.filiereService.findAll().subscribe(filieres => {
            this.filiereState.setFilieres(filieres);
        })
    }

    getfilieres$(): Observable<Filiere[]> {
        return this.filiereState.getFiliere$();
    }

    addFiliere(nom: string): Observable<string> {
        let message = new Subject<string>();
        this.filiereService.addfiliere(nom).subscribe(response => {
            // console.log("Response",response.message)
            if (response.id) {
                this.filiereState.addFiliere(response);
                message.next("Ok");
            }
            else {
                message.next(response.message);
            }
        }, error => {
            this.setLoading(false);
            message.next(this.handleError(error));
        })

        return message;
    }
    addFiliereDialog(title: string,
        input: "number" | "text" | "email" | "password" | "tel" | "range" | "textarea" | "select" | "radio" | "checkbox" | "file",
        facade: FiliereFacade) {
        swal.fire({
            title: title,
            input: input,
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,

            preConfirm: function (inputValue) {
                // console.log("Here we go")
                if (inputValue.length == 0) return new Promise(function (resolve, reject) {
                    resolve("The name field should not be empty.");
                });
                return new Promise(function (resolve, reject) {
                    facade.addFiliere(inputValue).subscribe(message => {
                        resolve(message);
                    })
                });
            },
            allowOutsideClick: false
        }).then(function (message) {
            if (message.value == "Ok") {
                swal.fire({
                    type: 'success',
                    title: 'Success',
                    html: `New Branch  added successfully`
                });
            }
            else {
                if (message.value) {
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


    removeFiliere(id: number) {
        this.filiereService.removefiliere(id).subscribe(response => {
            if (response.nom) {
                this.toastService.typeSuccess(`Filiere ${response.nom} deleted successfully`);
                this.filiereState.removeFiliere(id);
            }
            else {
                this.toastService.typeError(response.message);
            }
        });
    }
    updateFiliere(filiere: Filiere, old: Filiere) {
        if (filiere.nom === old.nom) {
            this.toastService.typeInfo("No Data To update");
        } else {
            return this.filiereService.updatefiliere(filiere).subscribe(response => {
                if (!response.nom || response.nom != filiere.nom) {
                    this.setError(response.message);
                    this.filiereState.updateFiliere(old);
                } else {
                    this.filiereState.updateFiliere(filiere);
                    this.toastService.typeSuccess("Branch  updated successfully");
                }
                ((error) => {
                    this.setError(error.message);
                    this.filiereState.updateFiliere(old);
                });
            });
        }

    }

    handleError(error: any): string {
        let text = "";
        for (let i = 0; i < error.error.message.length; i++) {
            if (i == error.error.message.length - 1) text += `${error.error.message[i]}`
            else text += `${error.error.message[i]} | `
        }
        return text;
    }

    getError$() {
        return this.filiereState.getError$();
    }

    setError(message) {
        this.filiereState.setError(message);
    }

    getLoading$() {
        return this.filiereState.isLoading$();
    }

    setLoading(value: boolean) {
        this.filiereState.setLoading(value);
    }
}