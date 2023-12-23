import {Component, OnInit} from '@angular/core';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as data from '../../../shared/data/dashboard/default';
import {AuthService} from '../../../shared/auth/auth.service';
import {Router} from '@angular/router';
import {UtilisateurService} from '../../../shared/services/user.service';
import {EvaluationService} from '../../../shared/services/evaluation.service';
import {SoumissionService} from '../../../shared/services/soumission.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
    user;
    stats;
    evaluations;
    soumissions;

    public purchase = data.purchase;
    public salesReturn = data.salesReturn;
    public sales = data.sales;
    public purchaseRate = data.purchaseRate;

    constructor(calendar: NgbCalendar,
                private authService: AuthService,
                private router: Router,
                private utilisateurService: UtilisateurService,
                private evaluationService: EvaluationService,
                private soumissionService: SoumissionService
    ) {
    }

    ngOnInit() {
        let userRole = this.authService.userData.roles[0];
        this.user = this.authService.userData;
        this.getStats();
        this.getEvaluations()
        this.getSoumissions()
        console.log('user', this.user);
        if (userRole === 'ROLE_ETUDIANT') {
            this.router.navigate(['/sesame/questionnaire/etudiant/liste']);
        } else if (userRole === 'ROLE_ENSEIGNANT') {
            this.router.navigate(['/sesame/questionnaire/enseignant/liste']);
        }

    }

    getStats() {
        this.utilisateurService.getCountStats().subscribe(
            success => {
                this.stats = success;


            },
            error => {
            }
        );
    }

    getEvaluations() {
        this.evaluationService.list().subscribe(
            success => {
                this.evaluations = success
            }
        )
    }

    getSoumissions(){
        this.soumissionService.getSoumissionByDate().subscribe(
            success => {
                this.soumissions = success
                console.log("soumission")
                console.log(this.soumissions)
            }
        )
    }


}
