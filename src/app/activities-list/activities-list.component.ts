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
    totalActiveTime: number;
    totalPassiveTime: number;
    timeBalance: number;

    constructor(private activityService: ActivityService) {
        activityService.activitiesAdded$.subscribe(
            addedActivity => {
                this.activities.push(addedActivity);
                this.recalculateBalance();
            }
        )
    }

    ngOnInit() {
        this.getActivities();
    }

    getActivities(): void {
        this.activityService.getActivities().subscribe(activities => {
                this.activities = activities;
                this.recalculateBalance();
            } 
        );
    }

/*        activities = activities.sort((a1,a2) => a1.type > a2.type ? 1 : -1); */

    deleteActivity(activity: Activity) {
        this.activities = this.activities.filter(a => a !== activity);
        this.activityService.deleteActivity(activity);
        this.recalculateBalance();
    }

    recalculateBalance(): void {
        this.totalActiveTime = 0;
        this.totalPassiveTime = 0;
        this.timeBalance = 0;
        for (var i = 0; i < this.activities.length; i++) {
            if (this.activities[i].type === "active") {
                this.totalActiveTime += this.activities[i].duration; 
            } else {
                this.totalPassiveTime += this.activities[i].duration; 
            }
        }
        this.timeBalance = this.totalActiveTime - this.totalPassiveTime;
    }
}