import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-questionnaires-list-etudiant',
  templateUrl: './questionnaires-list-etudiant.component.html',
  styleUrls: ['./questionnaires-list-etudiant.component.scss']
})
export class QuestionnairesListEtudiantComponent {

  data: any[] = [];

  constructor(
      private router: Router
  ) {
    // Generate an array of objects with random data
    for (let i = 0; i < 10; i++) { // Change the number of objects as needed
      const randomYear = Math.floor(Math.random() * 2) + 2022; // Random year between 2022 and 2023
      const randomMonth = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
      const randomDay = Math.floor(Math.random() * 28) + 1; // Random day between 1 and 28
      const randomDatePosted = new Date(randomYear, randomMonth - 1, randomDay); // Month is 0-indexed in JavaScript

      const randomTitre = `evaluation semestre ${i % 2 === 0 ? 1 : 2}`; // Alternate between "1" and "2"

      const randomDateLimite = new Date(randomYear, randomMonth - 1, randomDay + 30); // Random date within 30 days
      const randomSubmitted = Math.random() < 0.5; // 50% chance of being true or false

      this.data.push({
        datePosted: randomDatePosted.toISOString(), // Convert to ISO format
        titre: randomTitre,
        dateLimite: randomDateLimite.toISOString(),
        submitted: randomSubmitted
      });
    }
  }

  openForm(){
    this.router.navigate(["/sesame/questionnaire/etudiant/remplir/1"])
  }

}
