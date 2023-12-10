import { Component } from '@angular/core';
import {Classe} from '../../../../shared/model/classe.model';
import {Matiere} from '../../../../shared/model/matiere.model';
import {ClasseService} from '../../../../shared/services/classe.service';
import {MatDialog} from '@angular/material/dialog';
import {MatiereService} from '../../../../shared/services/matiere.service';
import {AjouterClasseComponent} from '../../Classes/ajouter-classe/ajouter-classe.component';
import {AjouterMatiereComponent} from '../ajouter-matiere/ajouter-matiere.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-matieres',
  templateUrl: './list-matieres.component.html',
  styleUrls: ['./list-matieres.component.scss']
})
export class ListMatieresComponent {

  matieres : Array<Matiere> = [];

  classeId;
  constructor(private matiereService: MatiereService,
              private _matDialog: MatDialog,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit() {
      this.classeId = this.activatedRoute.snapshot.paramMap.get('id');

      if(this.classeId != null) {
          this.getMatieresByClasse()
      }else {
          this.getAllMatieres()
      }
  }

  getAllMatieres() {
    this.matiereService.getAll().subscribe(
        success => {
          this.matieres =success
          console.log("success")
          console.log(success)
        }
    )
  }

    getMatieresByClasse() {
        this.matiereService.getAllByClasse(this.classeId).subscribe(
            success => {
                this.matieres =success
                console.log("success")
                console.log(success)
            }
        )
    }

  ajouterMatiere(): void {
    // Open the dialog
    const dialogRef = this._matDialog.open(AjouterMatiereComponent);

    dialogRef.afterClosed()
        .subscribe((result) => {
          this.getAllMatieres();
        });
  }

}
