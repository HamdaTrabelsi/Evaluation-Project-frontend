import { Component } from '@angular/core';
import {PRODUCT} from '../../../../shared/data/tables/product-list';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-evaluations',
  templateUrl: './list-evaluations.component.html',
  styleUrls: ['./list-evaluations.component.scss']
})
export class ListEvaluationsComponent {

  evaluations: any[] = [
    {
      Classe: "ING4A",
      creationDate: new Date("2022-09-01"),
      numberOfParticipants: 50,
      AnneeUniversitaire: "2022/2023",
      Semestre: "semestre 1",
    },
    {
      Classe: "ING3C",
      creationDate: new Date("2023-01-15"),
      numberOfParticipants: 45,
      AnneeUniversitaire: "2023/2024",
      Semestre: "semestre 2",
    },
    {
      Classe: "ING5A",
      creationDate: new Date("2022-12-10"),
      numberOfParticipants: 55,
      AnneeUniversitaire: "2022/2023",
      Semestre: "semestre 1",
    },
    {
      Classe: "ING4B",
      creationDate: new Date("2023-03-20"),
      numberOfParticipants: 60,
      AnneeUniversitaire: "2023/2024",
      Semestre: "semestre 2",
    },
    {
      Classe: "ING3A",
      creationDate: new Date("2023-02-05"),
      numberOfParticipants: 48,
      AnneeUniversitaire: "2022/2023",
      Semestre: "semestre 1",
    },
    {
      Classe: "ING5B",
      creationDate: new Date("2023-06-15"),
      numberOfParticipants: 53,
      AnneeUniversitaire: "2023/2024",
      Semestre: "semestre 2",
    },
    // Add more Evaluation objects as needed
  ];

  constructor(
      private router: Router
  ) {}

  showSubmissions(){
    this.router.navigate(["/sesame/questionnaire/administrateur/liste/1"])
  }

  showStats(){
    this.router.navigate(["/sesame/questionnaire/administrateur/formulaire/statistiques/1"])
  }
}
