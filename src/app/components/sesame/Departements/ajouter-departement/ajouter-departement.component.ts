 import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepartementService} from '../../../../shared/services/departement.service';
import {Departement} from '../../../../shared/model/departement.model';

@Component({
  selector: 'app-ajouter-departement',
  templateUrl: './ajouter-departement.component.html',
  styleUrls: ['./ajouter-departement.component.scss']
})
export class AjouterDepartementComponent implements OnInit {

  departementForm : FormGroup;
  constructor(
      public matDialogRef: MatDialogRef<AjouterDepartementComponent>,
      private _formBuilder: FormBuilder,
      private departementService: DepartementService) {}

  ngOnInit(): void {
    this.departementForm = this._formBuilder.group({
      nom : ['', Validators.required],
      description : ['', Validators.required],
      adminName : ['', Validators.required],
      nbEtudiants : ['', Validators.required],
      ngEnseignants : ['', Validators.required],
      nbClasses : ['', Validators.required]
    })
  }

  ajouterdepartement(){
    if (!this.departementForm.valid) {
      return
    }

    let departement: Departement = {
      nom : this.departementForm.get("nom").value,
      description : this.departementForm.get("description").value,
      adminName : this.departementForm.get("adminName").value,
      nbEtudiants : this.departementForm.get("nbEtudiants").value,
      ngEnseignants : this.departementForm.get("ngEnseignants").value,
      nbClasses : this.departementForm.get("nbClasses").value,
    }

    console.log(departement)

  this.departementService.add(departement).subscribe(
      success => {
        console.log("created")
        this.matDialogRef.close('closed');
      },
      error => {
        console.log("error")
      }
  )
  }
}


