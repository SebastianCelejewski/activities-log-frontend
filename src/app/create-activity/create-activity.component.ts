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
  
  }

}
