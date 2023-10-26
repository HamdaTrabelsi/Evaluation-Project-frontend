import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ClasseService} from '../../../../shared/services/classe.service';
import {Classe} from '../../../../shared/model/classe.model';

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

  constructor(
      public matDialogRef: MatDialogRef<AjouterClasseComponent>,
      private _formBuilder: FormBuilder,
      private classService: ClasseService
  ) {
    this.generateYearRanges();
  }

  ngOnInit(): void {
    this.classeForm = this._formBuilder.group({
      nom : ['', Validators.required],
      anneeUniversitaire : ['', Validators.required]
    })
  }

  generateYearRanges() {
    for (let year = this.minYear; year < this.maxYear; year++) {
      const nextYear = year + 1;
      const yearRange = `${year}/${nextYear}`;
      this.yearRanges.push(yearRange);
      console.log(this.yearRanges)
    }
  }

  ajouterClasse(){
    if (!this.classeForm.valid) {
      return
    }

    let classe: Classe = {
      nom : this.classeForm.get("nom").value,
      anneeUniversitaire : this.classeForm.get("anneeUniversitaire").value
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
