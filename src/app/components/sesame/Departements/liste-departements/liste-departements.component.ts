import {Component, OnInit} from '@angular/core';
import {DepartementService} from '../../../../shared/services/departement.service';
import {Departement} from '../../../../shared/model/departement.model';
import {AjouterDepartementComponent} from '../ajouter-departement/ajouter-departement.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-liste-departements',
  templateUrl: './liste-departements.component.html',
  styleUrls: ['./liste-departements.component.scss']
})
export class ListeDepartementsComponent implements OnInit{

  public active = 1;
  departements : Array<Departement> = [];

  constructor(private departementService: DepartementService,
              private _matDialog: MatDialog) {
  }
  ngOnInit() {
  this.getAllDepartements()
  }

  getAllDepartements() {
    this.departementService.getAll().subscribe(
        success => {
          console.log(success)
        }
    )
  }

  ajouterDepartement(): void {
    // Open the dialog
    const dialogRef = this._matDialog.open(AjouterDepartementComponent);

    dialogRef.afterClosed()
        .subscribe((result) => {
          //this.getListeDemande();
        });
  }
}
