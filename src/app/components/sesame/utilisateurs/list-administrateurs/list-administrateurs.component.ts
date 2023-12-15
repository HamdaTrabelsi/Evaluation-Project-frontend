import { Component } from '@angular/core';
import {PRODUCT} from '../../../../shared/data/tables/product-list';
import {Router} from '@angular/router';
import {UtilisateurService} from '../../../../shared/services/user.service';

@Component({
  selector: 'app-list-administrateurs',
  templateUrl: './list-administrateurs.component.html',
  styleUrls: ['./list-administrateurs.component.scss']
})
export class ListAdministrateursComponent {

  users: Array<any> = [];

  constructor(
      private _router: Router,
      private _userService: UtilisateurService) {
  }

  ngOnInit(): void {
    this.getUtilisateurs()
  }

  getUtilisateurs(){
    this._userService.getAllByRole("ROLE_ADMIN").subscribe(
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
