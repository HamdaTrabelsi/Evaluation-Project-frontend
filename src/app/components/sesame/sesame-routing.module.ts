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
import {
    ListeQuestionnairesAdminComponent
} from './Questionnaires/administrateur/liste-questionnaires-admin/liste-questionnaires-admin.component';
import {
    DetailsQuestionnairesAdminComponent
} from './Questionnaires/administrateur/details-questionnaires-admin/details-questionnaires-admin.component';
import {
    StatistiquesQuestionnairesAdminComponent
} from './Questionnaires/administrateur/statistiques-questionnaires-admin/statistiques-questionnaires-admin.component';
import {ListMatieresComponent} from './Matieres/list-matieres/list-matieres.component';

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
        path: 'matieres',
        children: [
            {
                path: 'list',
                component: ListMatieresComponent
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
            {
                path: 'administrateur',
                children: [
                    {
                        path: 'liste/:id',
                        component: ListeQuestionnairesAdminComponent
                    },
                    {
                        path: 'formulaire/details/:id',
                        component: DetailsQuestionnairesAdminComponent
                    },
                    {
                        path: 'formulaire/statistiques/:id',
                        component: StatistiquesQuestionnairesAdminComponent
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
