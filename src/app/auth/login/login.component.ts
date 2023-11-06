import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public newUser = false;
  public loginForm: FormGroup;
  public show: boolean = false
  errorMessage: any = false;


  constructor(private fb: FormBuilder, public router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  login() {
      if(!this.loginForm.valid) {
        console.log("----")
        return
      }



      let user = {
        email: this.loginForm.get("email").value,
        password: this.loginForm.get("password").value,
      }

      this.authService.signIn(user).subscribe(
        success => {
          console.log("success")
          console.log(success)
          this.router.navigate(["/dashboard/default"]);

        },
        error => {
            this.errorMessage = true
          console.log("error")
          console.log(error)
        }
      )
      

    //}
  }

  showPassword(){
    this.show = !this.show
  }
}
