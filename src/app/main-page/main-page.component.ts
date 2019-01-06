import { Component } from '@angular/core';
import { Subject } from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

    users: string[] = [ "Filip", "Maja"];
    userChangedSubject: Subject<string> = new Subject<string>();
    currentUser: string = this.users[0];

    ngAfterViewInit() {
    	this.fireUserChanged();
    }

    onUserChanged(event): void {
    	const eventTarget = event.target;
    	const select = <HTMLSelectElement>eventTarget;
        this.currentUser = select.value;
        this.fireUserChanged();
    }

    fireUserChanged(): void {
    	this.userChangedSubject.next(this.currentUser);
    }

}
