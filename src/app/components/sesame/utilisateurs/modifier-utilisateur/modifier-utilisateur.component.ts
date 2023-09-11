import { Component } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Classe} from '../../../../shared/model/classe.model';
import {ClasseService} from '../../../../shared/services/classe.service';
import {AuthService} from '../../../../shared/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilisateurService} from '../../../../shared/services/user.service';
import {Utilisateur} from '../../../../shared/model/utilisateur.model';

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.scss']
})
export class ModifierUtilisateurComponent {

  public editForm: UntypedFormGroup;
  public profileForm: UntypedFormGroup;
  classesList: Array<Classe> = []
  isStudent : boolean = false;
  errorMessage: String = ""
  currentId: String;
  user: Utilisateur;

  roles = {
    ROLE_SUPER_ADMIN: 'Super Admin',
    ROLE_ADMIN: 'Admin',
    ROLE_ENSEIGNANT: 'Enseignant',
    ROLE_ETUDIANT: 'Étudiant',
  };

  constructor(private fb: UntypedFormBuilder,
              private classService: ClasseService,
              private  authService: AuthService,
              private router: Router,
              private activatedRoute:ActivatedRoute,
              private userService: UtilisateurService) { }

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getListClasses()

    this.profileForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      linkedIn: [''],
    })


    this.editForm = this.fb.group({
      role: ['', [Validators.required]],
      classe: [],
      identifiant: ['', [Validators.required]],
      prenom: [''],
      nom: [''],
      address: [''],
      codePostal: [''],
      description: [''],
    })
  }

  changeRole(event: any){
    this.isStudent = event.value == "ROLE_ETUDIANT"
    if(this.isStudent) {
      this.editForm.get("classe").setValidators([Validators.required])
    }else {
      this.editForm.get("classe").setValue("")
      this.editForm.get("classe").clearValidators()
    }

    this.editForm.get("classe").updateValueAndValidity()
  }


  getListClasses(){
    this.classService.getAll().subscribe(
        success => {
          this.classesList = success
          this.getUser()
        },
        error => {
          console.log(error)
        }
    )
  }

  getUser(){
    console.log(this.currentId)
    this.userService.getById(this.currentId).subscribe(
        success => {
          console.log(success)
          this.user = success
          this.populateForm()
        }
    )
  }

  populateForm(){
    this.profileForm.get("email").setValue(this?.user.email)
    this.profileForm.get("linkedIn").setValue(this?.user.linkedInUrl)

    this.editForm.get("identifiant").setValue(this?.user.identifiant)
    this.editForm.get("prenom").setValue(this?.user.firstName)
    this.editForm.get("nom").setValue(this?.user.lastname)
    this.editForm.get("address").setValue(this?.user.adresse)
    this.editForm.get("codePostal").setValue(this?.user.codePostal)
    this.editForm.get("description").setValue(this?.user.description)

    this.editForm.get("role").setValue(this.roles[this.user.roles[0]?.name])

    if(this.user.roles[0]?.name == "ROLE_ETUDIANT") {
      this.editForm.get("classe").setValue(this?.user.classe.nom)
    }
  }

  editAccountInfo(){
    let userInfo : Utilisateur = {
      email : this.profileForm.get("email").value,
      password : this.profileForm.get("password").value,
      linkedInUrl : this.profileForm.get("linkedIn").value,
    }

    this.userService.editUser(this.currentId, userInfo).subscribe(
        success => {
          console.log("success")
          this.router.navigate(["/sesame/utilisateurs/list"])

        },
        error => {
          console.log("error")
          this.errorMessage = error?.error?.message
        }
    );
  }

  editPersonalInfo(){

    let personalInfo : Utilisateur = {
      email : this.editForm.get("identifiant").value,
      password : this.editForm.get("prenom").value,
      linkedInUrl : this.editForm.get("nom").value,
      adresse : this.editForm.get("address").value,
      codePostal : this.editForm.get("codePostal").value,
      description : this.editForm.get("description").value,
    }

    this.userService.editUser(this.currentId, personalInfo).subscribe(
        success => {
          console.log("success")
          this.router.navigate(["/sesame/utilisateurs/list"])

        },
        error => {
          console.log(error)
          this.errorMessage = error?.error?.message
        }
    );
  }
}
