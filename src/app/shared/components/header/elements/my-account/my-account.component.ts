import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth/auth.service";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  public userName: string;
  public profileImg: "assets/images/dashboard/profile.jpg";

  constructor(public router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.userName = this.authService.userData.email
  }

  logoutFunc() {
    this.authService.signOut().subscribe(
      success => {
        this.router.navigateByUrl('auth/login');
        window.location.reload();
      },
      error => {
        console.log(error)
      }
    )
    
  }
}
