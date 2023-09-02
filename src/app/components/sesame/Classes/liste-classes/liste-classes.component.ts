import { Component } from '@angular/core';
import {Departement} from '../../../../shared/model/departement.model';
import {DepartementService} from '../../../../shared/services/departement.service';
import {MatDialog} from '@angular/material/dialog';
import {AjouterDepartementComponent} from '../../Departements/ajouter-departement/ajouter-departement.component';
import {ClasseService} from '../../../../shared/services/classe.service';
import {Classe} from '../../../../shared/model/classe.model';

@Component({
  selector: 'app-liste-classes',
  templateUrl: './liste-classes.component.html',
  styleUrls: ['./liste-classes.component.scss']
})
export class ListeClassesComponent {
  public active = 1;
  classes : Array<Classe> = [];

  constructor(private classeService: ClasseService,
              private _matDialog: MatDialog) {
  }
  ngOnInit() {
    this.getAllClasses()
  }

  getAllClasses() {
    this.classeService.getAll().subscribe(
        success => {
          console.log(success)
        }
    )
  }

  ajouterClasse(): void {
    // Open the dialog
  //   const dialogRef = this._matDialog.open();
  //
  //   dialogRef.afterClosed()
  //       .subscribe((result) => {
  //         //this.getListeDemande();
  //       });
  }
}
