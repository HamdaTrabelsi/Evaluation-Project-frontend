import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
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
import { CreateEvaluationComponent } from './evaluations/create-evaluation/create-evaluation.component';
import { ListEvaluationsComponent } from './evaluations/list-evaluations/list-evaluations.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { QuestionnairesEtudiantComponent } from './Questionnaires/etudiant/questionnaires-etudiant/questionnaires-etudiant.component';
import { QuestionnairesListEtudiantComponent } from './Questionnaires/etudiant/questionnaires-list-etudiant/questionnaires-list-etudiant.component';
import {MatStepperModule} from '@angular/material/stepper';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ArchwizardModule} from 'angular-archwizard';
import {MatRadioModule} from '@angular/material/radio';
import { ListeQuestionnairesAdminComponent } from './Questionnaires/administrateur/liste-questionnaires-admin/liste-questionnaires-admin.component';
import { DetailsQuestionnairesAdminComponent } from './Questionnaires/administrateur/details-questionnaires-admin/details-questionnaires-admin.component';
import { StatistiquesQuestionnairesAdminComponent } from './Questionnaires/administrateur/statistiques-questionnaires-admin/statistiques-questionnaires-admin.component';
import {TabsModule} from 'ngx-tabset';
import {NgApexchartsModule} from 'ng-apexcharts';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ListMatieresComponent } from './Matieres/list-matieres/list-matieres.component';
import { AjouterMatiereComponent } from './Matieres/ajouter-matiere/ajouter-matiere.component';
import {WordDocumentService} from '../../shared/services/wordDocumentService.service';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import { ListeAnneeUniversitairesComponent } from './Questionnaires/Enseignantl/liste-annee-universitaires/liste-annee-universitaires.component';
import { EvaluationEnseignantComponent } from './Questionnaires/Enseignantl/evaluation-enseignant/evaluation-enseignant.component';
import { ImporterEtudiantsComponent } from './utilisateurs/importer-etudiants/importer-etudiants.component';
import { ListAdministrateursComponent } from './utilisateurs/list-administrateurs/list-administrateurs.component';
import { ListEnseignantsComponent } from './utilisateurs/list-enseignants/list-enseignants.component';
import { ListEtudiantsComponent } from './utilisateurs/list-etudiants/list-etudiants.component';
import { ListSuperAdminisrateurComponent } from './utilisateurs/list-super-adminisrateur/list-super-adminisrateur.component';


@NgModule({
    declarations: [
        ListeDepartementsComponent,
        AjouterDepartementComponent,
        ListeClassesComponent,
        ListeutilisateursComponent,
        AjouterUtilisateurComponent,
        AjouterClasseComponent,
        ModifierUtilisateurComponent,
        CreateEvaluationComponent,
        ListEvaluationsComponent,
        QuestionnairesEtudiantComponent,
        QuestionnairesListEtudiantComponent,
        ListeQuestionnairesAdminComponent,
        DetailsQuestionnairesAdminComponent,
        StatistiquesQuestionnairesAdminComponent,
        ListMatieresComponent,
        AjouterMatiereComponent,
        ListeAnneeUniversitairesComponent,
        EvaluationEnseignantComponent,
        ImporterEtudiantsComponent,
        ListAdministrateursComponent,
        ListEnseignantsComponent,
        ListEtudiantsComponent,
        ListSuperAdminisrateurComponent,
    ],
    imports: [
        CommonModule,
        SesameRoutingModule,
        SharedModule,
        NgxDropzoneModule,
        NgSelectModule,
        MatStepperModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule,
        ArchwizardModule,
        SharedModule,
        NgSelectModule,
        MatRadioModule,
        TabsModule,
        NgApexchartsModule,
        CanvasJSAngularChartsModule,
        Ng2GoogleChartsModule
    ],
    providers: [
        WordDocumentService,
        DatePipe// Add your service here
    ],
})
export class SesameModule {
}
