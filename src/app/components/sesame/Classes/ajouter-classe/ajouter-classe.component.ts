import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ClasseService} from '../../../../shared/services/classe.service';
import {Classe} from '../../../../shared/model/classe.model';
import {Departement} from '../../../../shared/model/departement.model';
import {DepartementService} from '../../../../shared/services/departement.service';

@Component({
  selector: 'app-ajouter-classe',
  templateUrl: './ajouter-classe.component.html',
  styleUrls: ['./ajouter-classe.component.scss']
})
export class AjouterClasseComponent {

  classeForm:FormGroup;

  yearRanges: string[] = [];

  minYear = (new Date().getFullYear())-3
  maxYear = (new Date().getFullYear())+2

  departements: Array<Departement> = [];

  constructor(
      public matDialogRef: MatDialogRef<AjouterClasseComponent>,
      private _formBuilder: FormBuilder,
      private classService: ClasseService,
      private departementService: DepartementService,
  ) {
    this.generateYearRanges();
  }

  ngOnInit(): void {
    this.getAllDepartements();

    this.classeForm = this._formBuilder.group({
      nom : ['', Validators.required],
      anneeUniversitaire : ['', Validators.required],
      departement : ['', Validators.required],
      nbEtudiants : ['', Validators.required],
      nbEnseignants : ['', Validators.required]
    })
  }

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item?.nom?.toLocaleLowerCase().indexOf(term) > -1 || item?.anneeUniversitaire?.toLocaleLowerCase().indexOf(term) > -1;
  }
  generateYearRanges() {
    for (let year = this.minYear; year < this.maxYear; year++) {
      const nextYear = year + 1;
      const yearRange = `${year}/${nextYear}`;
      this.yearRanges.push(yearRange);
      console.log(this.yearRanges)
    }
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

  ajouterClasse(){
    if (!this.classeForm.valid) {
      return
    }

    let classe: Classe = {
      nom : this.classeForm.get("nom").value,
      anneeUniversitaire : this.classeForm.get("anneeUniversitaire").value,
      departement : this.classeForm.get("departement").value,
      nbEtudiants : this.classeForm.get("nbEtudiants").value,
      nbEnseignants : this.classeForm.get("nbEnseignants").value
    }

    this.classService.add(classe).subscribe(
        success => {
          this.matDialogRef.close('closed');
        },
        error => {
          console.log("error")
        }
    )
  }
}
