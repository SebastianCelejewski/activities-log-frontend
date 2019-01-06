import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private loggedIn = false;
    private userName: string = "";
    private instanceId: number;
    private loginError: string = "";

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
        if (
            (userName === 'Filip' && userPassword === 'Filip')
            || (userName === 'Maja' && userPassword === 'Maja')) {
            return of(true).pipe(
                delay(1000),
                tap(val => {
                    this.loggedIn = true;
                    this.userName = userName;
                })
            );
        } else {
            return of(false).pipe(
                delay(1000),
                tap(val => {
                    this.loginError = "Invalid user name or password";
                })
            );
        }
    }

    logout(): void {
        this.loggedIn = false;
        this.userName = undefined;
    }
}