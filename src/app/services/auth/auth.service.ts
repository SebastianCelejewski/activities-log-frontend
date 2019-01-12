import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { AuthenticationDetails } from 'amazon-cognito-identity-js';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    public redirectUrl: string;

    private loggedIn = false;
    private userName: string = "";
    private loginError: string = "";
    private cognitoUser: CognitoUser;

    private awsCognitoUserPool = new CognitoUserPool({
        UserPoolId: environment.cognitoUserPool,
        ClientId: environment.cognitoClientId
    });

    public isLoggedIn(): boolean {
        return this.loggedIn;
    }

    public getUserName(): string {
        return this.userName;
    }

    public getLoginError(): string {
        return this.loginError;
    }

    login(userName: string, userPassword: string): Observable<boolean> {
        var authenticationDetails = new AuthenticationDetails({
            Username : userName,
            Password : userPassword
        });

        this.cognitoUser = new CognitoUser({
            Username : userName,
            Pool : this.awsCognitoUserPool
        });

        const ref = this;

        return new Observable((observer) => {
            ref.cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log("Successfully authenticated using AWS Cognito");
                    ref.loginError = "No error";
                    ref.loggedIn = true;
                    ref.userName = userName;
                    observer.next(true);
                },
                onFailure: function(err) {
                    const le = "Failed to authenticate: " + err.message;
                    console.log(le);
                    ref.loginError = le;
                    observer.next(false)
                },
                newPasswordRequired: function(userAttributes, requiredAttributes) {
                    console.log("New password required");
                    ref.loginError = "New password required";
                    ref.cognitoUser.completeNewPasswordChallenge(userPassword, [], this);
                }
            });    
        });
    }

    logout(): void {
        if (this.cognitoUser != null) {
            this.cognitoUser.signOut();
        }
        this.loggedIn = false;
        this.userName = undefined;
    }
}