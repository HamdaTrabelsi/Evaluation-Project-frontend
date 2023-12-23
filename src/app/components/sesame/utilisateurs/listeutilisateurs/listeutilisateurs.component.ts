import { Component } from '@angular/core';
import {PRODUCT} from '../../../../shared/data/tables/product-list';
import {Router} from '@angular/router';
import {UtilisateurService} from '../../../../shared/services/user.service';
import {AuthService} from '../../../../shared/auth/auth.service';

@Component({
  selector: 'app-listeutilisateurs',
  templateUrl: './listeutilisateurs.component.html',
  styleUrls: ['./listeutilisateurs.component.scss']
})
export class ListeutilisateursComponent {

  public products = PRODUCT;
  users: Array<any> = [];

  currentRole;

  constructor(
      private _router: Router,
      private _userService: UtilisateurService,
      private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentRole = this.authService.userData.roles[0]
    this.getUtilisateur()
  }

  getUtilisateur(){
    this._userService.getAll().subscribe(
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
