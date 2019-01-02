import { Injectable } from '@angular/core';
import { Activity } from '../domain/activity';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl = "https://c4mpyiczgd.execute-api.eu-central-1.amazonaws.com/dev/activities";

  constructor(private http: HttpClient) { }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.apiUrl);

  }
}