import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Activities Log';
    envName = environment.name;
    users: string[] = [ "Filip", "Maja"];
    private userChangedSubject: Subject<string> = new Subject<string>();
    currentUser: string = this.users[0];

    ngAfterViewInit() {
    	this.fireUserChanged();
    }

    onUserChanged(id: string): void {
        this.currentUser = event.target.value;
        this.fireUserChanged();
    }

    fireUserChanged(): void {
    	this.userChangedSubject.next(this.currentUser);
    }
}