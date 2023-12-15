import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UtilisateurService} from '../../../../shared/services/user.service';

@Component({
  selector: 'app-list-super-adminisrateur',
  templateUrl: './list-super-adminisrateur.component.html',
  styleUrls: ['./list-super-adminisrateur.component.scss']
})
export class ListSuperAdminisrateurComponent {
  users: Array<any> = [];

  constructor(
      private _router: Router,
      private _userService: UtilisateurService) {
  }

  ngOnInit(): void {
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
