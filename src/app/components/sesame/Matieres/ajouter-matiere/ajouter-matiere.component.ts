import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ClasseService} from '../../../../shared/services/classe.service';
import {MatiereService} from '../../../../shared/services/matiere.service';
import {UtilisateurService} from '../../../../shared/services/user.service';
import {Classe} from '../../../../shared/model/classe.model';
import {Utilisateur} from '../../../../shared/model/utilisateur.model';
import {Matiere} from '../../../../shared/model/matiere.model';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-ajouter-matiere',
    templateUrl: './ajouter-matiere.component.html',
    styleUrls: ['./ajouter-matiere.component.scss']
})
export class AjouterMatiereComponent {

    existsError : Boolean = false

    matiereForm: FormGroup;

    classes: Classe[] = [];

    enseignants: Utilisateur[] = [];

    semestres  = ["Semestre 1", "Semestre 2"]

    constructor(
        public matDialogRef: MatDialogRef<AjouterMatiereComponent>,
        private _formBuilder: FormBuilder,
        private matiereService: MatiereService,
        private utilisateurService: UtilisateurService,
        private classeService: ClasseService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.matiereForm = this._formBuilder.group({
            nom : ['', Validators.required],
            semestre : ['', Validators.required],
            enseignant : ['', Validators.required],
            classe : ['', Validators.required],
        })

        this.getAllClasses()
    }

    getAllClasses() {
        this.classeService.getAll().subscribe(
            success => {
                this.classes = success;
                this.getAllEnseignants();
            },
            error => {
                console.log(error);
            }
        );
    }

    getAllEnseignants() {
        this.utilisateurService.getAllByRole('ROLE_ENSEIGNANT').subscribe(
            success => {
                this.enseignants = success;
                console.log(this.enseignants)
            },
            error => {
                console.log(error);
            }
        );
    }

    saveMatiere() {
        let matiere : Matiere = this.buildMatiere();

        this.matiereService.add(matiere).subscribe(
            success => {
                this.toastr.success('Succès', 'Matière ajouté');
                this.matDialogRef.close('closed');
            },
            error => {
                if(error?.error == "Matiere already exists"){
                    this.existsError = true
                }
                console.log(error)
            }
        )
    }

    buildMatiere() {
        let matiere: Matiere = {
            nom: this.matiereForm.get('nom').value,
            semestre: this.matiereForm.get('semestre').value,
            enseignant: this.matiereForm.get('enseignant').value,
            classe: this.matiereForm.get('classe').value,
        }

        console.log(matiere)
        return matiere
    }

    customSearchFn(term: string, item: any) {
        term = term.toLocaleLowerCase();
        return item?.nom?.toLocaleLowerCase().indexOf(term) > -1 || item?.anneeUniversitaire?.toLocaleLowerCase().indexOf(term) > -1;
    }

    customSearchFnEnseignant(term: string, item: any) {
        term = term.toLocaleLowerCase();
        return item?.firstname?.toLocaleLowerCase().indexOf(term) > -1 || item?.lastname?.toLocaleLowerCase().indexOf(term) > -1;
    }
}
