import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Evaluation} from '../model/evaluation.model';
import {Observable} from 'rxjs';
import {Soumission} from '../model/soumission.model';
import {EtudiantDTO} from '../model/etudiantDTO.model';

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

    getStatByEvaluation(_id: any): Observable<any> {
        return this.httpClient.get(this.url + "/getSoumissionByEvaluation/"+ _id)
    }

    getSoumissionById(_id: any): Observable<any> {
        return this.httpClient.get(this.url + "/getById/"+ _id)
    }

    getStudentByEvaluation(_id: any): Observable<EtudiantDTO[]> {
        return this.httpClient.get<EtudiantDTO[]>(this.url + "/getStudentByEvaluation/"+ _id)
    }

    getNumberOfSoumissionForClasse(_evaluationId:any): Observable<any> {
        return this.httpClient.get(this.url +"/getNumberOfSoumissionForClasse/"+_evaluationId);
    }

    getMoyennesEvaluation(_evaluationId:any): Observable<any> {
        return this.httpClient.get(this.url +"/getMoyennesEvaluation/"+_evaluationId);
    }

    getAnneesUniversitaireEnseignant(enseignantId): Observable<any> {
        return this.httpClient.get(this.url+"/getEnseignantAnneesUniversitaires/"+enseignantId)
    }

    getMoyennesEnseignantByAnnee(enseignantId,anneeUniversitaire):Observable<any> {
        return this.httpClient.get(this.url+"/getMoyennesEnseignantByIdAndAnnee/"+enseignantId, {params:{anneeUniversitaire}})
    }

    getStatistiquesEnseignantByIdAndAnnee(enseignantId,anneeUniversitaire):Observable<any> {
        return this.httpClient.get(this.url+"/getStatistiquesEnseignantByIdAndAnnee/"+enseignantId, {params:{anneeUniversitaire}})
    }

    getEnseignantSoumissions(enseignantId,anneeUniversitaire):Observable<any> {
        return this.httpClient.get(this.url+"/getEnseignantSoumissions/"+enseignantId, {params:{anneeUniversitaire}})
    }
}
