import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListeDepartementsComponent} from './Departements/liste-departements/liste-departements.component';
import {SesameRoutingModule} from './sesame-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { AjouterDepartementComponent } from './Departements/ajouter-departement/ajouter-departement.component';


@NgModule({
    declarations: [
        ListeDepartementsComponent,
        AjouterDepartementComponent,
    ],
    imports: [
        CommonModule,
        SesameRoutingModule,
        CommonModule,
        SharedModule,
        NgxDropzoneModule
    ]
})
export class SesameModule {
}
