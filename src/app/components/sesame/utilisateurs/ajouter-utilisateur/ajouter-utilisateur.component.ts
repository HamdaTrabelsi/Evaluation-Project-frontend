import { Component } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ClasseService} from '../../../../shared/services/classe.service';
import {Classe} from '../../../../shared/model/classe.model';
import {Utilisateur} from '../../../../shared/model/utilisateur.model';
import {Departement} from '../../../../shared/model/departement.model';
import {AuthService} from '../../../../shared/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.scss']
})
export class AjouterUtilisateurComponent {

  public creationForm: UntypedFormGroup;
  classesList: Array<Classe> = []
  isStudent : boolean = false;
  errorMessage: String = ""

  constructor(private fb: UntypedFormBuilder,
              private classService: ClasseService,
              private  authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.getListClasses()
    this.creationForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      linkedIn: [''],

      role: ['', [Validators.required]],
      classe: [],
      identifiant: ['', [Validators.required]],
      prenom: ['',[Validators.required]],
      nom: ['', [Validators.required]],
      address: [''],
      codePostal: [''],
      description: [''],
    })
  }

  changeRole(event: any){
    this.isStudent = event.value == "ROLE_ETUDIANT"
    if(this.isStudent) {
      this.creationForm.get("classe").setValidators([Validators.required])
    }else {
      this.creationForm.get("classe").setValue("")
      this.creationForm.get("classe").clearValidators()
    }

    this.creationForm.get("classe").updateValueAndValidity()
  }


  getListClasses(){
    this.classService.getAll().subscribe(
        success => {
          this.classesList = success
        },
        error => {
          console.log(error)
        }
    )
  }

  createUser(){
    console.log(this.creationForm.controls.password.errors)
    if(!this.creationForm.valid){
      console.log("this form is invalid")
      console.log(this.creationForm)
      return
    }

    let classe: Classe = {
      id : this.creationForm.get("classe").value
    }
    let user : Utilisateur = {
      username :this.creationForm.get("email").value,
      email : this.creationForm.get("email").value,
      ...this.creationForm.get("classe").value != "" ? {classe} : {},
      firstName: this.creationForm.get("prenom").value,
      lastname:this.creationForm.get("nom").value,
      identifiant: this.creationForm.get("identifiant").value,
      codePostal: this.creationForm.get("codePostal").value,
      description: this.creationForm.get("description").value,
      linkedInUrl: this.creationForm.get("linkedIn").value,
      password: this.creationForm.get("password").value,
      adresse: this.creationForm.get("address").value,
      roles : [this.creationForm.get("role").value,
      ]
    }

    console.log(user)

    this.authService.addUser(user).subscribe(
        success => {
          console.log("user created successfully")
          this.router.navigate(["/sesame/utilisateurs/list"])
        },
        error => {
          console.log(error.error)
          this.errorMessage = error?.error?.message
        }
    )
  }

}
