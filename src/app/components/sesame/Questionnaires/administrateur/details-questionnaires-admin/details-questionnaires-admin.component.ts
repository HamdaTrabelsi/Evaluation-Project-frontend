import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../../shared/auth/auth.service';
import {SoumissionService} from '../../../../../shared/services/soumission.service';
import {Soumission} from '../../../../../shared/model/soumission.model';

@Component({
    selector: 'app-details-questionnaires-admin',
    templateUrl: './details-questionnaires-admin.component.html',
    styleUrls: ['./details-questionnaires-admin.component.scss']
})
export class DetailsQuestionnairesAdminComponent {

    soumissionId;
    evaluationId;
    soumission: Soumission;

    userRole: string;

    constructor(
        private soumissionService: SoumissionService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.soumissionId = this.activatedRoute.snapshot.paramMap.get('soumissionId');
        this.evaluationId = this.activatedRoute.snapshot.paramMap.get('evaluationId');

        this.userRole = this.authService.userData.roles[0];
        this.getSoumission();
    }

    getSoumission() {
        this.soumissionService.getSoumissionById(this.soumissionId).subscribe(
            success => {
                this.soumission = success;
                console.log(this.soumission);
            },
            error => {
                console.log(error);
            }
        );
    }

    ouvrirListe() {
        if(this.userRole == 'ROLE_ADMIN'){
            this.router.navigate(['/sesame/questionnaire/administrateur/liste/' + this.evaluationId]);
        }else if(this.userRole == 'ROLE_ETUDIANT') {
            this.router.navigate(['sesame/questionnaire/etudiant/liste']);
        }
    }
}
