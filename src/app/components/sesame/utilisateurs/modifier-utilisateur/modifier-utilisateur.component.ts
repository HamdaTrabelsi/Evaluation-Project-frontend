import { Component } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.scss']
})
export class ModifierUtilisateurComponent {
  public myProfile: UntypedFormGroup;
  public editProfile: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.myProfile = this.fb.group({
      email: ['', [Validators.email]],
      password: [''],
      website: [],
    });
    this.editProfile = this.fb.group({
      company: [''],
      userName: [''],
      email: ['', Validators.email],
      firstName: [''],
      lastName: [''],
      address: [''],
      about: ['']
    })
  }
}
