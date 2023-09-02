import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClasseService} from '../../../../shared/services/classe.service';
import {Classe} from '../../../../shared/model/classe.model';
import {AjouterClasseComponent} from '../ajouter-classe/ajouter-classe.component';

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
          this.classes =success
          console.log(success)
        }
    )
  }

  ajouterClasse(): void {
    // Open the dialog
    const dialogRef = this._matDialog.open(AjouterClasseComponent);

    dialogRef.afterClosed()
        .subscribe((result) => {
          this.getAllClasses();
        });
  }
}
