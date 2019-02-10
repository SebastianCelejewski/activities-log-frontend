import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Guid } from "guid-typescript";
import { Observable, of, Subject } from 'rxjs';

import { Activity } from '../../domain/activity';

import {environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'jDJjerhkwerKJER'
  })
};

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    private apiUrl = environment.apiUrl + "/activities";

    private activitiesAddedSubject = new Subject<Activity>();

    activitiesAdded$ = this.activitiesAddedSubject.asObservable();

    constructor(private http: HttpClient) { }

    getActivities(user: string): Observable<Activity[]> {
        const url = `${this.apiUrl}?user=${user}`;
        return this.http.get<Activity[]>(url, httpOptions);
    }

    createActivity(activity: Activity): void {
        activity.id = Guid.create().toString();
  	    this.http.post<Activity>(this.apiUrl, activity, httpOptions).subscribe(x => this.activitiesAddedSubject.next(activity));
    }

    deleteActivity(activity: Activity): void {
        const id = activity.id;
        const url = `${this.apiUrl}/${id}`;
  	    this.http.delete<Activity>(url, httpOptions).subscribe();
    }
}