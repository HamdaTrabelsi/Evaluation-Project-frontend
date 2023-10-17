import { Component } from '@angular/core';
import {PRODUCT} from '../../../../shared/data/tables/product-list';
import {Router} from '@angular/router';
import {EvaluationService} from '../../../../shared/services/evaluation.service';

@Component({
  selector: 'app-list-evaluations',
  templateUrl: './list-evaluations.component.html',
  styleUrls: ['./list-evaluations.component.scss']
})
export class ListEvaluationsComponent {

  evaluations: any[] = [];

  constructor(
      private router: Router,
      private evaluationService: EvaluationService
  ) {}

  ngOnInit() {
    this.getListEvaluations()
  }

  getListEvaluations(){
    this.evaluationService.list().subscribe(
        success => {
          this.evaluations = success
          console.log(success)
        },
        error => {
          console.log(error)
        }
    )
  }

  showSubmissions(){
    this.router.navigate(["/sesame/questionnaire/administrateur/liste/1"])
  }

  showStats(){
    this.router.navigate(["/sesame/questionnaire/administrateur/formulaire/statistiques/1"])
  }
}
