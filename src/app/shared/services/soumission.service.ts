import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Evaluation} from '../model/evaluation.model';
import {Observable} from 'rxjs';
import {Soumission} from '../model/soumission.model';

@Injectable({
    providedIn: 'root'
})

export class SoumissionService {

    private url: string = "http://localhost:8081/api/soumission";

    constructor(private httpClient: HttpClient,
                private _AuthService: AuthService) {
    }

    add(_soumission: Soumission): Observable<any> {
        return this.httpClient.post(this.url + "/save", _soumission)
    }

}
