// word-document.service.ts

import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import * as fs from 'file-saver';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {Evaluation} from '../model/evaluation.model';

@Injectable({
    providedIn: 'root'
})
export class WordDocumentService {

    constructor(private httpClient: HttpClient,
                private _AuthService: AuthService) {}

    getTemplateFile(url): Observable<any> {
        return this.httpClient.get<any>( url)
    }
}
