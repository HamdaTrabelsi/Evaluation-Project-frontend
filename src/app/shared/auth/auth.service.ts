import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from './auth.utils';

@Injectable()
export class AuthService {

    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        //private _userService: UserService
    ) { }


    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    /**
     * Getters and setters for user data
     */
    set userData(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    get userData(): any {
        const user = localStorage.getItem('user') ?? '';
        if (user) {
            return JSON.parse(user);
        }
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------



    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('http://localhost:8080/api/auth/signin', credentials).pipe(
            switchMap((response: any) => {

                //console.log(" response "+response.accessToken)
                // Store the access token in the local storage
                this.accessToken = response.accessToken;
                this.userData = response;
                // Set the authenticated flag to true
                this._authenticated = true;

                localStorage.setItem("user", JSON.stringify(response));
                console.log("response", response)

                // Store the user on the user service
                //this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
 * Sign out
 */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }


    /**
* Check the authentication status
*/
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return of(true);
    }

}
