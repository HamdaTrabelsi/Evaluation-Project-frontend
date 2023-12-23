import {Component, OnInit} from '@angular/core';
import {DepartementService} from '../../../../shared/services/departement.service';
import {Departement} from '../../../../shared/model/departement.model';
import {AjouterDepartementComponent} from '../ajouter-departement/ajouter-departement.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthService} from '../../../../shared/auth/auth.service';

@Component({
    selector: 'app-liste-departements',
    templateUrl: './liste-departements.component.html',
    styleUrls: ['./liste-departements.component.scss']
})
export class ListeDepartementsComponent implements OnInit {

    public active = 1;
    departements: Array<Departement> = [];

    currentRole

    constructor(private departementService: DepartementService,
                private _matDialog: MatDialog,
                private router: Router,
                private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.currentRole = this.authService.userData.roles[0]

        this.getAllDepartements();
    }

    getAllDepartements() {
        this.departementService.getAll().subscribe(
            success => {
                this.departements = success;
                console.log('new list');
                console.log(success);
            }
        );
    }

    showClasses(_id) {
        this.router.navigate(["/sesame/departement/"+_id+"/classes"])
    }

    ajouterDepartement(): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(AjouterDepartementComponent);

        dialogRef.afterClosed()
            .subscribe((result) => {
                this.getAllDepartements();
            });
    }
}
