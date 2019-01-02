import { Component, OnInit } from '@angular/core';
import { Activity } from '../../domain/activity';
import { ActivityService } from '../../services/activity.service';

@Component({
    selector: 'app-activities-list',
    templateUrl: './activities-list.component.html',
    styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent implements OnInit {

    activities: Activity[];

    constructor(private activityService: ActivityService) { }

    ngOnInit() {
        this.getActivities();
    }

    getActivities(): void {
        this.activityService.getActivities().subscribe(activities => this.processActivities(activities) );
    }

    processActivities(activities: Activity[]): void {
        var balance = 0;
        for (var i = 0; i < activities.length; i++) {
            if (activities[i].type === "active") {
                balance = balance + activities[i].duration;
            } else {
                balance = balance - activities[i].duration;
            }
            activities[i].balance = balance;
        }
        this.activities = activities;
    }

}