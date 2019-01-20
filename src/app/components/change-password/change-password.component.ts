import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    message = "";

    constructor(private authService: AuthService) {
        this.message = ""; 
    }

    ngOnInit() {
    }

    changePassword(currentPassword: string, newPassword: string, confirmedNewPassword: string) {
        if (!currentPassword) {
            this.message = "Current password cannot be empty";
            return;
        }

        if (!newPassword) {
            this.message = "New password cannot be empty";
            return;
        }

        if (!confirmedNewPassword) {
            this.message = "Confirmed new password cannot be empty";
            return;
        }

        if (newPassword === confirmedNewPassword) {
            this.message = "Password change in progress...";
            this.authService.changePassword(currentPassword, newPassword).subscribe((message) => this.message = message);
        } else {
            this.message = "New password and confirmed new password does not match";
        }
    }  
}