import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Guid } from "guid-typescript";
import { Observable, of, Subject } from 'rxjs';

import { Activity } from '../domain/activity';

import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    private apiUrl = environment.apiUrl;

    private activitiesAddedSubject = new Subject<Activity>();

    activitiesAdded$ = this.activitiesAddedSubject.asObservable();

    constructor(private http: HttpClient) { }

    getActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.apiUrl);
    }

    createActivity(activity: Activity): void {
        activity.id = Guid.create().toString();
  	    this.http.post<Activity>(this.apiUrl, activity).subscribe(x => this.activitiesAddedSubject.next(activity));
    }

    deleteActivity(activity: Activity): void {
        const id = activity.id;
        const url = `${this.apiUrl}/${id}`;
  	    this.http.delete<Activity>(url).subscribe();
    }
}