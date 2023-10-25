import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Classe} from '../model/classe.model';
import {Matiere} from '../model/matiere.model';

@Injectable({
    providedIn: 'root'
})
export class MatiereService {

    private url: string = "http://localhost:8081/api/matiere";

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<Array<Matiere>> {
        return this.httpClient.get<Array<Matiere>>(this.url + "/all")
    }

    add(_matiere: Matiere): Observable<any> {
        return this.httpClient.post(this.url + "/save", _matiere)
    }
}
