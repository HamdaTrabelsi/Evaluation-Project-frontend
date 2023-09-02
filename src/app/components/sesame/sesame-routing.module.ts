import {ListeDepartementsComponent} from './Departements/liste-departements/liste-departements.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListeClassesComponent} from './Classes/liste-classes/liste-classes.component';
import {ListeutilisateursComponent} from './utilisateurs/listeutilisateurs/listeutilisateurs.component';
import {AjouterUtilisateurComponent} from './utilisateurs/ajouter-utilisateur/ajouter-utilisateur.component';

const routes: Routes = [
    {
        path: 'departement',
        children: [
            {
                path: 'list',
                component: ListeDepartementsComponent
            },
        ]
    },
    {
        path: 'classes',
        children: [
            {
                path: 'list',
                component: ListeClassesComponent
            },
        ]
    },
    {
        path: 'utilisateurs',
        children: [
            {
                path: 'list',
                component: ListeutilisateursComponent
            },
            {
                path: 'ajout',
                component: AjouterUtilisateurComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SesameRoutingModule { }
