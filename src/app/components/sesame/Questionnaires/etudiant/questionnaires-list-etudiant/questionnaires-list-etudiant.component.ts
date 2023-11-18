import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {EvaluationService} from '../../../../../shared/services/evaluation.service';
import {AuthService} from '../../../../../shared/auth/auth.service';

@Component({
  selector: 'app-questionnaires-list-etudiant',
  templateUrl: './questionnaires-list-etudiant.component.html',
  styleUrls: ['./questionnaires-list-etudiant.component.scss']
})
export class QuestionnairesListEtudiantComponent {

  data: any[] = [];
  evaluations: any[] = [];

  constructor(
      private router: Router,
      private evaluationService: EvaluationService,
      private authService: AuthService
  ) {}

  ngOnInit() {
    this.getListEvaluations()

  }

  getListEvaluations(){
    let userData = this.authService.userData;
    let studentId = userData.id;
    let classeId = userData.classe.id;

    this.evaluationService.getStudentEvaluations(classeId, studentId).subscribe(
        success => {
          this.evaluations = success
           console.log(success)
        },
        error => {
          console.log(error)
        }
    )
  }


  openForm(evaluationId:any){
    this.router.navigate(["/sesame/questionnaire/etudiant/remplir/"+evaluationId])
  }

  openDetails(soumissionId:any){
    this.router.navigate(["/sesame/questionnaire/etudiant/details/"+soumissionId])
  }
}
