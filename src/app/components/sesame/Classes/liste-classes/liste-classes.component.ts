import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClasseService} from '../../../../shared/services/classe.service';
import {Classe} from '../../../../shared/model/classe.model';
import {AjouterClasseComponent} from '../ajouter-classe/ajouter-classe.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-liste-classes',
  templateUrl: './liste-classes.component.html',
  styleUrls: ['./liste-classes.component.scss']
})
export class ListeClassesComponent {
  public active = 1;
  classes : Array<Classe> = [];

  departementId;
  constructor(private classeService: ClasseService,
              private _matDialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
  ) {
  }
  ngOnInit() {
      this.departementId = this.activatedRoute.snapshot.paramMap.get('id');

      if(this.departementId != null) {
          this.getAllClassesByDepartement()
      }else {
          this.getAllClasses()
      }
  }

  getAllClasses() {
    this.classeService.getAll().subscribe(
        success => {
          this.classes =success
          console.log(success)
        }
    )
  }

    getAllClassesByDepartement() {
        this.classeService.getbyDepartement(this.departementId).subscribe(
            success => {
                this.classes =success
                console.log(success)
            }
        )
    }

    showMatieres(_id) {
        this.router.navigate(["/sesame/classes/"+_id+"/matieres"])
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
