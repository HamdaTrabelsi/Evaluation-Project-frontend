import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ClasseService} from '../../../../shared/services/classe.service';
import {Departement} from '../../../../shared/model/departement.model';
import {Classe} from '../../../../shared/model/classe.model';

@Component({
  selector: 'app-ajouter-classe',
  templateUrl: './ajouter-classe.component.html',
  styleUrls: ['./ajouter-classe.component.scss']
})
export class AjouterClasseComponent {

  classeForm:FormGroup;

  constructor(
      public matDialogRef: MatDialogRef<AjouterClasseComponent>,
      private _formBuilder: FormBuilder,
      private classService: ClasseService
  ) {}

  ngOnInit(): void {
    this.classeForm = this._formBuilder.group({
      nom : ['', Validators.required]
    })
  }

  ajouterClasse(){
    if (!this.classeForm.valid) {
      return
    }

    let classe: Classe = {
      nom : this.classeForm.get("nom").value
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
