import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {EvaluationService} from '../../../../../shared/services/evaluation.service';
import {SoumissionService} from '../../../../../shared/services/soumission.service';
import {AuthService} from '../../../../../shared/auth/auth.service';

@Component({
  selector: 'app-liste-annee-universitaires',
  templateUrl: './liste-annee-universitaires.component.html',
  styleUrls: ['./liste-annee-universitaires.component.scss']
})
export class ListeAnneeUniversitairesComponent {

  anneesUniversitaires: any[] = []
  constructor(
      private router: Router,
      private soumissionService: SoumissionService,
      private authservice: AuthService
  ) {}

  ngOnInit() {
    this.getListAnnees();
  }

  getListAnnees(){
    let enseignant = this.authservice.userData
    console.log("enseignant")
    console.log(enseignant)
    this.soumissionService.getAnneesUniversitaireEnseignant(enseignant.id).subscribe(
        success => {
          this.anneesUniversitaires = success
          console.log(success)
        },
        error => {
          console.log(error)
        }
    )
  }

  showEvaluation(anneeUniversitaire){
    this.router.navigate(["/sesame/questionnaire/enseignant/evaluation"], {state:{ anneeUniversitaire: anneeUniversitaire} })
  }
}
