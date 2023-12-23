import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UtilisateurService} from '../../../../shared/services/user.service';
import {AuthService} from '../../../../shared/auth/auth.service';

@Component({
  selector: 'app-list-enseignants',
  templateUrl: './list-enseignants.component.html',
  styleUrls: ['./list-enseignants.component.scss']
})
export class ListEnseignantsComponent {
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
    this._userService.getAllByRole("ROLE_ENSEIGNANT").subscribe(
        success => {
          console.log(success)
          this.users = success
        }
    )
  }

  editUser(id:String){
    this._router.navigate(["/sesame/utilisateurs/modifier/"+id])
  }

  ajouterUtilisateur(){
    this._router.navigate(["/sesame/utilisateurs/create"])
  }
}
