import { Component, OnInit } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as data from "../../../shared/data/dashboard/default";
import {AuthService} from '../../../shared/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  constructor(calendar: NgbCalendar,
              private authService: AuthService,
              private router: Router,
  ) {}

  ngOnInit() {
    let userRole = this.authService.userData.roles[0]
    if(userRole === "ROLE_ADMIN") {
      this.router.navigate(['/sesame/evaluations/list']);
    }else if(userRole === "ROLE_ETUDIANT"){
      this.router.navigate(['/sesame/questionnaire/etudiant/liste']);
    }else if(userRole === "ROLE_ENSEIGNANT"){
      this.router.navigate(['/sesame/questionnaire/enseignant/liste']);
    }
  }

  public purchase = data.purchase
  public salesReturn = data.salesReturn
  public sales = data.sales
  public purchaseRate = data.purchaseRate

  
}
