import { Component, OnInit } from '@angular/core';

import { Activity } from '../../domain/activity';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
  }

  addActivity(activityDate: string, activityType: string, activityDescription: string, activityDuration: string): void {
  	activityDate = activityDate.trim();
  	activityType = activityType.trim();
  	activityDescription = activityDescription.trim();
  	activityDuration = activityDuration.trim();

  	if (!activityDate || !activityType || !activityDescription || !activityDuration) {
  		return;
  	}

  	var activity = new Activity();
  	activity.type = activityType;
  	activity.date = activityDate;
  	activity.user = 'Filip';
  	activity.description = activityDescription;
  	activity.duration = +activityDuration;

  	this.activityService.createActivity(activity);

  }

}
