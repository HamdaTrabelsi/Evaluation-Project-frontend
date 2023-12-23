import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UtilisateurService} from '../../../../shared/services/user.service';
import {AuthService} from '../../../../shared/auth/auth.service';

@Component({
  selector: 'app-list-etudiants',
  templateUrl: './list-etudiants.component.html',
  styleUrls: ['./list-etudiants.component.scss']
})
export class ListEtudiantsComponent {
  users: Array<any> = [];

  currentRole

  constructor(
      private _router: Router,
      private _userService: UtilisateurService,
      private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentRole = this.authService.userData.roles[0]
    this.getUtilisateurs()
  }

  getUtilisateurs(){
    this._userService.getAllByRole("ROLE_ETUDIANT").subscribe(
        success => {
          console.log(success)
          this.users = success
        }
    )
  }

  importer(){
    this._router.navigate(["/sesame/utilisateurs/importer/etudiants"])
  }

  editUser(id:String){
    this._router.navigate(["/sesame/utilisateurs/modifier/"+id])
  }

  ajouterUtilisateur(){
    this._router.navigate(["/sesame/utilisateurs/create"])
  }
}
