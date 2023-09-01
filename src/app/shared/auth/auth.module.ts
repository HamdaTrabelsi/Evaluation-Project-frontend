import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { NgModule } from "@angular/core";

@NgModule({
    imports  : [
        HttpClientModule
    ],
    providers: [
        AuthService,
        /*{
            provide : HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi   : true
        }*/
    ]
})
export class AuthModule
{
}
