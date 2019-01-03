import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Guid } from "guid-typescript";
import { Observable, of } from 'rxjs';

import { Activity } from '../domain/activity';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    private apiUrl = "https://c4mpyiczgd.execute-api.eu-central-1.amazonaws.com/dev/activities";

    constructor(private http: HttpClient) { }

    getActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.apiUrl);
    }

    createActivity(activity: Activity): void {
        activity.id = Guid.create().toString();
  	    this.http.post<Activity>(this.apiUrl, activity).subscribe();
    }

    deleteActivity(activity: Activity): void {
        const id = activity.id;
        const url = `${this.apiUrl}/${id}`;
  	    this.http.delete<Activity>(url).subscribe();
    }
}