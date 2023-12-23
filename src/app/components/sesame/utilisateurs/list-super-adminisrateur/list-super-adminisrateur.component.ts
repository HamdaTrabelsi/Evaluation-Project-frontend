import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UtilisateurService} from '../../../../shared/services/user.service';
import {AuthService} from '../../../../shared/auth/auth.service';

@Component({
  selector: 'app-list-super-adminisrateur',
  templateUrl: './list-super-adminisrateur.component.html',
  styleUrls: ['./list-super-adminisrateur.component.scss']
})
export class ListSuperAdminisrateurComponent {
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
    this._userService.getAllByRole("ROLE_SUPER_ADMIN").subscribe(
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
