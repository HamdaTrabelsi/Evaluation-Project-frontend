import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {Classe} from '../model/classe.model';

@Injectable({
    providedIn: 'root'
})
export class ClasseService {

    private url: string = "http://localhost:8081/api/classe";
    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<Array<Classe>> {
        return this.httpClient.get<Array<Classe>>(this.url + "/all")
    }

    getbyDepartement(_departementid): Observable<Array<Classe>> {
        return this.httpClient.get<Array<Classe>>(this.url + "/all/"+_departementid)
    }

    add(_classe: Classe): Observable<any> {
        return this.httpClient.post(this.url + "/save", _classe)
    }

    delete(id: number): Observable<Array<Classe>> {
        return this.httpClient.delete<Array<Classe>>(this.url + "/delete/" + id)
    }

}
