import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Departement} from '../model/departement.model';

@Injectable({
    providedIn: 'root'
  })
  export class DepartementService {
  
    private url: string = "http://localhost:8080/api/departement";
    constructor(private httpClient: HttpClient,
      private _AuthService: AuthService) { }
  
    getAll(): Observable<Array<Departement>> {
      return this.httpClient.get<Array<Departement>>(this.url + "/all")
    }
  
    add(_departement: Departement): Observable<any> {
      return this.httpClient.post(this.url + "/save", _departement)
    }
  
    delete(id: number): Observable<Array<Departement>> {
      return this.httpClient.delete<Array<Departement>>(this.url + "/delete/" + id)
    }
  
  }
