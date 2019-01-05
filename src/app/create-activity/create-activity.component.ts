import { Component, OnInit, Input } from '@angular/core';

import { Activity } from '../../domain/activity';
import { ActivityService } from '../../services/activity.service';

import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-create-activity',
    templateUrl: './create-activity.component.html',
    styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

    public selectedDate:string = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    datePickerConfig = { format: "YYYY-MM-DD" }

    user: string;
    @Input() userChangeEvents: Observable<string>;

    constructor(private activityService: ActivityService, private datePipe: DatePipe) { }

    ngOnInit() {
      this.userChangeEvents.subscribe(user => {
            this.user = user;
      });
    }

    addActivity(activityDate: string, activityType: string, activityDescription: string, activityDuration: string): void {
        activityDate = this.selectedDate;
  	    // activityDate = activityDate.trim();
  	    activityType = activityType.trim();
  	    activityDescription = activityDescription.trim();
  	    activityDuration = activityDuration.trim();

  	    if (!activityDate || !activityType || !activityDescription || !activityDuration) {
  		      return;
  	    }

  	    var activity = new Activity();
  	    activity.type = activityType;
  	    activity.date = activityDate;
  	    activity.user = this.user;
  	    activity.description = activityDescription;
  	    activity.duration = +activityDuration;

  	    this.activityService.createActivity(activity);
    }
}