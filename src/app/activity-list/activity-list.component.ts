import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Activity } from '../../domain/activity';
import { ActivityService } from '../../services/activity.service';

@Component({
    selector: 'app-activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

    activities: Activity[];
    totalActiveTime: number;
    totalPassiveTime: number;
    timeBalance: number;
    user: string;
    @Input() userChangeEvents: Observable<string>;

    constructor(private activityService: ActivityService) {
        activityService.activitiesAdded$.subscribe(
            addedActivity => {
                this.activities.push(addedActivity);
                this.sortActivities();
                this.recalculateBalance();
            }
        )
    }

    ngOnInit() {
        this.userChangeEvents.subscribe(user => {
            this.user = user;
            this.getActivities();
            });
        this.getActivities();
    }

    getActivities(): void {
        this.activityService.getActivities(this.user).subscribe(activities => {
                this.activities = activities;
                this.sortActivities(); 
                this.recalculateBalance();
            } 
        );
    }

    sortActivities(): void {
        this.activities = this.activities.sort((a1, a2) => this.sort(a1, a2));
    }

    sort(a1: Activity, a2: Activity): number {
        const d1 = 0 + a1.date;
        const d2 = 0 + a2.date;
        if (d1!=d2) {
            return d1 > d2 ? 1 : -1;
        }
        const t1 = a1.type;
        const t2 = a2.type;
        return t1 > t2 ? 1 : -1;
    }

/*        activities = activities.sort((a1,a2) => a1.type > a2.type ? 1 : -1); */

    deleteActivity(activity: Activity) {
        this.activities = this.activities.filter(a => a !== activity);
        this.activityService.deleteActivity(activity);
        this.sortActivities();
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