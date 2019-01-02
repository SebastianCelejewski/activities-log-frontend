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
        activities = activities.sort((a1,a2) => a1.type > a2.type ? 1 : -1);
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

    deleteActivity(activityId: string) {
        this.activities = this.activities.filter(a => a.id !== activityId);
        this.activityService.deleteActivity(activityId);
    }
}