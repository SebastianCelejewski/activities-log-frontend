import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
 
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    message: string = "";
 	userName: string = "";
 	userPassword: string = "";

    constructor(public authService: AuthService, public router: Router) {
    	this.updateLoginInfoMessage();
    }

    ngOnInit() {
    	this.updateLoginInfoMessage();
    }

    ngAfterViewInit() {
    	this.updateLoginInfoMessage();
    }

    updateLoginInfoMessage() {
    	if (this.authService.isLoggedIn()) {
    		this.message = 'Logged in as ' + this.authService.getUserName();
    	} else {
    		this.message = 'Logged out';
    	}
    }
 
    login(userName: string, userPassword: string) {
        this.message = 'Trying to log in as ' + userName;
        this.userName = userName;
        this.userPassword = userPassword;
 
        this.authService.login(userName, userPassword).subscribe(() => {
            if (this.authService.isLoggedIn()) {
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/activities';
                this.router.navigate([redirect]);
            } else {
            	this.message = "Login error: " + this.authService.getLoginError();
            }
        });
    }
 
    logout() {
    	this.message = "Logging out";
        this.authService.logout();
    	this.message = "Logged out";
    }
}