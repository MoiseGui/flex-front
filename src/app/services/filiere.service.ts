import { Filiere } from './../models/filiere';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class FiliereService {
    readonly API = 'http://localhost:3000/filieres';
    constructor(
        private http: HttpClient
    ) { }

    findAll(): Observable<Filiere[]> {
        return this.http.get<Filiere[]>(`${this.API}/`);
    }

    updatefiliere(filiere: Filiere): Observable<any> {
        const { nom } = filiere;
        return this.http.put(`${this.API}/id/${filiere.id}`, { nom });
    }

    addfiliere(nom: string): Observable<any> {
        return this.http.post(`${this.API}/`, { nom });
    }

    removefiliere(id: number): Observable<any> {
        return this.http.delete(`${this.API}/id/${id}`);
    }
}