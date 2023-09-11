import { Component } from '@angular/core';
import {PRODUCT} from '../../../../shared/data/tables/product-list';
import {Router} from '@angular/router';
import {UtilisateurService} from '../../../../shared/services/user.service';

@Component({
  selector: 'app-listeutilisateurs',
  templateUrl: './listeutilisateurs.component.html',
  styleUrls: ['./listeutilisateurs.component.scss']
})
export class ListeutilisateursComponent {

  public products = PRODUCT;
  users: Array<any> = [];

  constructor(
      private _router: Router,
      private _userService: UtilisateurService) {
  }

  ngOnInit(): void {
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
    this._router.navigate(["/sesame/utilisateurs/ajout"])
  }
}
