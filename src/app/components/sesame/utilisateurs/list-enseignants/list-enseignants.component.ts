import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UtilisateurService} from '../../../../shared/services/user.service';

@Component({
  selector: 'app-list-enseignants',
  templateUrl: './list-enseignants.component.html',
  styleUrls: ['./list-enseignants.component.scss']
})
export class ListEnseignantsComponent {
  users: Array<any> = [];

  constructor(
      private _router: Router,
      private _userService: UtilisateurService) {
  }

  ngOnInit(): void {
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
