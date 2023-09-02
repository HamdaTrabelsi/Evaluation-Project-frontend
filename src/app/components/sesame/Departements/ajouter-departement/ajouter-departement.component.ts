import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ajouter-departement',
  templateUrl: './ajouter-departement.component.html',
  styleUrls: ['./ajouter-departement.component.scss']
})
export class AjouterDepartementComponent implements OnInit {

  departementForm : FormGroup;
  constructor(
      public matDialogRef: MatDialogRef<AjouterDepartementComponent>,
      private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.departementForm = this._formBuilder.group({
      nom : ['', Validators.required],
      description : ['', Validators.required]
    })
  }

  ajouterdepartement(){
  console.log(this.departementForm.get("nom").value)
  }
}


