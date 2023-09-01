import { Component } from '@angular/core';

@Component({
  selector: 'app-ajouter-departement',
  templateUrl: './ajouter-departement.component.html',
  styleUrls: ['./ajouter-departement.component.scss']
})
export class AjouterDepartementComponent {

  constructor(public matDialogRef: MatDialogRef<AjouterDepartementComponent>,) {}
}
