import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { AuthenticationDetails } from 'amazon-cognito-identity-js';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private loggedIn = false;
    private userName: string = "";
    private instanceId: number;
    private loginError: string = "";

    private poolData = {
        UserPoolId: environment.cognitoUserPool,
        ClientId: environment.cognitoClientId
    }

    private cognitoUser: CognitoUser;

    redirectUrl: string;

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
        var authenticationData = {
            Username : userName,
            Password : userPassword
        };

        var authenticationDetails = new AuthenticationDetails(authenticationData);

        var userPool = new CognitoUserPool(this.poolData);
    
        var userData = {
            Username : userName,
            Pool : userPool
        };

        this.cognitoUser = new CognitoUser(userData);
        const ref = this;

        return new Observable((observer) => {
            ref.cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log("Successfully authenticated using AWS Cognito");
//                    var accessToken = result.getAccessToken().getJwtToken();
//                    console.log("Access token: " + accessToken);
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