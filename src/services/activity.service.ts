import { Injectable } from '@angular/core';
import { Activity } from '../domain/activity';

const ACTIVITIES: Activity[] = [
	{ id: 1, date: '2018-01-02', type: 'Ruch', description: 'Jazda na rowerze', duration: 0.5},
	{ id: 2, date: '2018-01-02', type: 'Ruch', description: 'WF', duration: 0.75},
	{ id: 3, date: '2018-01-02', type: 'Ruch', description: 'WF', duration: 0.75},
	{ id: 4, date: '2018-01-02', type: 'Ruch', description: 'Jazda na rowerze', duration: 0.5},
	{ id: 5, date: '2018-01-02', type: 'Komputer', description: 'Granie', duration: 1},
	{ id: 6, date: '2018-01-02', type: 'Komputer', description: 'YouTube', duration: 0.5}
];

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor() { }

  getActivities(): Activity[] {
    var balance = 0;
    for (var i = 0; i < ACTIVITIES.length; i++) {
    	if (ACTIVITIES[i].type === "Ruch") {
	    	balance = balance + ACTIVITIES[i].duration;
	    	ACTIVITIES[i].class = "active";
		} else {
	    	balance = balance - ACTIVITIES[i].duration;
	    	ACTIVITIES[i].class = "computer";
		}
    	ACTIVITIES[i].balance = balance;
    }
  	return ACTIVITIES;
  }
}