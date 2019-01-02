import { Injectable } from '@angular/core';
import { Activity } from '../domain/activity';

const ACTIVITIES: Activity[] = [
	{ id: 1, date: '2018-01-02', type: 'Jazda na rowerze', duration: 0.5},
	{ id: 2, date: '2018-01-02', type: 'WF', duration: 0.75},
	{ id: 3, date: '2018-01-02', type: 'WF', duration: 0.75},
	{ id: 4, date: '2018-01-02', type: 'Jazda na rowerze', duration: 0.5}
];

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor() { }

  getActivities(): Activity[] {
  	return ACTIVITIES;
  }
}
