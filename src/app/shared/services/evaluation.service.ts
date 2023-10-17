import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {Evaluation} from '../model/evaluation.model';

@Injectable({
    providedIn: 'root'
})

export class EvaluationService {

    private url: string = "http://localhost:8081/api/evaluation";

    constructor(private httpClient: HttpClient,
                private _AuthService: AuthService) {}

    add(_evaluation: Evaluation): Observable<any> {
        return this.httpClient.post(this.url + "/save", _evaluation)
    }
}
