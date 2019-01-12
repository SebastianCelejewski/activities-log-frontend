import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Activity } from '../../domain/activity';
import { ActivityService } from '../../services/activity/activity.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-create-activity',
    templateUrl: './create-activity.component.html',
    styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent {

    public selectedDate:string = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    datePickerConfig = { format: "YYYY-MM-DD" }

    constructor(
      private activityService: ActivityService,
      private authService: AuthService,
      private datePipe: DatePipe) { }

    addActivity(activityDate: string, activityType: string, activityDescription: string, activityDuration: string): void {
        activityDate = this.selectedDate;
  	    activityType = activityType.trim();
  	    activityDescription = activityDescription.trim();
  	    activityDuration = activityDuration.trim();

  	    if (!activityDate || !activityType || !activityDescription || !activityDuration) {
  		      return;
  	    }

  	    var activity = new Activity();
  	    activity.type = activityType;
  	    activity.date = activityDate;
  	    activity.user = this.authService.getUserName();
  	    activity.description = activityDescription;
  	    activity.duration = +activityDuration;

  	    this.activityService.createActivity(activity);
    }
}