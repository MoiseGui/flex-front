import { Filiere } from './../models/filiere';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class FiliereState {
    private filiere$ = new BehaviorSubject<Filiere[]>(null);
    private loading$ = new BehaviorSubject<boolean>(false);
    private updating$ = new BehaviorSubject<boolean>(false);
    private error$ = new BehaviorSubject<string>("");

    constructor() { }

    getFiliere$() {
        return this.filiere$.asObservable();
    }

    setProfesseurs(filieres: Filiere[]) {
        this.filiere$.next(filieres);
    }

    addProfesseur(filiere: Filiere) {
        const filieres = this.filiere$.getValue();

        if (filieres == null) {
            this.filiere$.next(new Array(filiere));
        }
        else {
            this.filiere$.next([...filieres, filiere]);
        }
    }

    updateProfesseur(filiere: Filiere) {
        const filieres = this.filiere$.getValue();
        for (let i = 0; i < filieres.length; i++) {
            if (filieres[i].id == filiere.id) filieres[i] = filiere;
        }
        this.filiere$.next([...filieres]);
    }

    removeProfesseur(id: number) {
        let filieres = this.filiere$.getValue();

        filieres = filieres.filter(filiere => filiere.id != id);

        this.filiere$.next([...filieres]);
    }

    setError(message) {
        this.error$.next(message)
    }

    getError$() {
        return this.error$;
    }

    isLoading$() {
        return this.loading$.asObservable();
    }

    setLoading(value: boolean) {
        this.loading$.next(value);
    }
}