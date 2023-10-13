import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-questionnaires-etudiant',
  templateUrl: './questionnaires-etudiant.component.html',
  styleUrls: ['./questionnaires-etudiant.component.scss']
})
export class QuestionnairesEtudiantComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
}
