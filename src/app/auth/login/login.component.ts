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
  public errorMessage: any;

  constructor(private fb: FormBuilder, public router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    //if (this.loginForm.value["email"] == "Test@gmail.com" && this.loginForm.value["password"] == "test123") {
      if(!this.loginForm.valid) {
        console.log("----")
        return
      }
      /*let user = {
        email: "Test@gmail.com",
        password: "test123",
        name: "test user",
      };*/


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
