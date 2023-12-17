import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../../shared/validators/passwordMatch';

@Component({
  selector: 'app-form-wizard-four',
  templateUrl: './form-wizard-four.component.html',
  styleUrls: ['./form-wizard-four.component.scss']
})
export class FormWizardFourComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  maxDate: Date;
 
  constructor(
    private _formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {
    this.maxDate = new Date();
   }


  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      cnfPassword: ['', Validators.required],
    },
    {
      validator: MustMatch('password', 'cnfPassword')
    });
    this.thirdFormGroup = this._formBuilder.group({
      birthdate: [null, Validators.required],
      age: [''],
      hasPassport: ['', Validators.required],
    })
    this.fourthFormGroup = this._formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
    })
  }
  public finish(){
    this.toaster.success('Successfully Registered')
  }

   
}
