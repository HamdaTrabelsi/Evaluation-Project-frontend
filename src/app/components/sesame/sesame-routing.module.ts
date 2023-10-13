import {ListeDepartementsComponent} from './Departements/liste-departements/liste-departements.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListeClassesComponent} from './Classes/liste-classes/liste-classes.component';
import {ListeutilisateursComponent} from './utilisateurs/listeutilisateurs/listeutilisateurs.component';
import {AjouterUtilisateurComponent} from './utilisateurs/ajouter-utilisateur/ajouter-utilisateur.component';
import {CreateEvaluationComponent} from './evaluations/create-evaluation/create-evaluation.component';
import {ListEvaluationsComponent} from './evaluations/list-evaluations/list-evaluations.component';
import {
    QuestionnairesListEtudiantComponent
} from './Questionnaires/etudiant/questionnaires-list-etudiant/questionnaires-list-etudiant.component';
import {QuestionnairesEtudiantComponent} from './Questionnaires/etudiant/questionnaires-etudiant/questionnaires-etudiant.component';

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
        path: 'evaluations',
        children: [
            {
                path: 'list',
                component: ListEvaluationsComponent
            },
            {
                path: 'create',
                component: CreateEvaluationComponent
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
                path: 'create',
                component: AjouterUtilisateurComponent
            },
        ]
    },
    {
        path: 'questionnaire',
        children: [
            {
                path: 'etudiant',
                children: [
                    {
                        path: 'liste',
                        component: QuestionnairesListEtudiantComponent
                    },
                    {
                        path: 'remplir/:id',
                        component: QuestionnairesEtudiantComponent
                    },
                ]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SesameRoutingModule {
}
