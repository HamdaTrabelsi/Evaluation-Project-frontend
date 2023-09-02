import { Component } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.scss']
})
export class AjouterUtilisateurComponent {
  public myProfile: UntypedFormGroup;
  public editProfile: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.myProfile = this.fb.group({
      bio: ['On the other hand, we denounce with righteous indignation'],
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
      city: [''],
      zipCode: [null],
      country: [''],
      about: ['']
    })
  }

}
