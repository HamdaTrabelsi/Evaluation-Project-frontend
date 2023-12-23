import {Component} from '@angular/core';
import {Matiere} from '../../../../shared/model/matiere.model';
import {MatDialog} from '@angular/material/dialog';
import {MatiereService} from '../../../../shared/services/matiere.service';
import {AjouterMatiereComponent} from '../ajouter-matiere/ajouter-matiere.component';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../shared/auth/auth.service';

@Component({
    selector: 'app-list-matieres',
    templateUrl: './list-matieres.component.html',
    styleUrls: ['./list-matieres.component.scss']
})
export class ListMatieresComponent {

    matieres: Array<Matiere> = [];

    classeId;

    currentRole;

    constructor(private matiereService: MatiereService,
                private _matDialog: MatDialog,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.currentRole = this.authService.userData.roles[0]

        this.classeId = this.activatedRoute.snapshot.paramMap.get('id');

        if (this.classeId != null) {
            this.getMatieresByClasse();
        } else {
            this.getAllMatieres();
        }
    }

    getAllMatieres() {
        this.matiereService.getAll().subscribe(
            success => {
                this.matieres = success;
                console.log('success');
                console.log(success);
            }
        );
    }

    getMatieresByClasse() {
        this.matiereService.getAllByClasse(this.classeId).subscribe(
            success => {
                this.matieres = success;
                console.log('success');
                console.log(success);
            }
        );
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
