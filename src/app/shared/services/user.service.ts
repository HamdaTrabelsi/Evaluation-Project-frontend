import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {Classe} from '../model/classe.model';
import {Utilisateur} from '../model/utilisateur.model';

@Injectable({
    providedIn: 'root'
})

export class UtilisateurService {

    private url: string = "http://localhost:8081/api/user";
    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<Array<Utilisateur>> {
        return this.httpClient.get<Array<Utilisateur>>(this.url + "/list")
    }

    getAllByRole(roleName : String): Observable<Utilisateur[]> {
        const params = { roleName };
        // @ts-ignore
        return this.httpClient.get<Utilisateur[]>(this.url + "/getByRole", {params})
    }

    getById(_id: any): Observable<Utilisateur> {
        return this.httpClient.get<Utilisateur>(this.url + "/getById/"+_id)
    }

    getCountStats(): Observable<any> {
        return this.httpClient.get<any>(this.url + "/getCountStats/")
    }



    editUser(_id: any, user: Utilisateur) {
        return this.httpClient.put<Utilisateur>(this.url + "/updateUser/"+_id, user)
    }

    importUser(classeId, file): Observable<any> {
        console.log("fillle")
        console.log(file)
        // const params = { classeId };

        var fd = new FormData();
        fd.append('file', file);
        fd.append('classeId', classeId);

        console.log("param")
        // console.log(params)
        return this.httpClient.post<any>(this.url+"/importer/etudiants",fd);
    }
}
