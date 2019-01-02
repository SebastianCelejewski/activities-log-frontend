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
        this.activities = this.activityService.getActivities();
    }

}