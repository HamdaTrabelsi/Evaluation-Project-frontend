import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListeDepartementsComponent} from './Departements/liste-departements/liste-departements.component';
import {SesameRoutingModule} from './sesame-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { AjouterDepartementComponent } from './Departements/ajouter-departement/ajouter-departement.component';
import { ListeClassesComponent } from './Classes/liste-classes/liste-classes.component';
import { ListeutilisateursComponent } from './utilisateurs/listeutilisateurs/listeutilisateurs.component';
import { AjouterUtilisateurComponent } from './utilisateurs/ajouter-utilisateur/ajouter-utilisateur.component';
import { AjouterClasseComponent } from './Classes/ajouter-classe/ajouter-classe.component';
import { ModifierUtilisateurComponent } from './utilisateurs/modifier-utilisateur/modifier-utilisateur.component';


@NgModule({
    declarations: [
        ListeDepartementsComponent,
        AjouterDepartementComponent,
        ListeClassesComponent,
        ListeutilisateursComponent,
        AjouterUtilisateurComponent,
        AjouterClasseComponent,
        ModifierUtilisateurComponent,
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
