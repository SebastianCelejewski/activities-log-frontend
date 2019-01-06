import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private loggedIn = false;
    private instanceId: number;

    redirectUrl: string;

    constructor() {
        console.log("Creating new instance of AuthService");
    }

    public isLoggedIn(): boolean {
        return this.loggedIn;
    }

    login(): Observable<boolean> {
        return of(true).pipe(
            delay(1000),
            tap(val => this.loggedIn = true)
        );
    }

    logout(): void {
        this.loggedIn = false;
    }
}