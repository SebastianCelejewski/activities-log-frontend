import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Guid } from "guid-typescript";
import { Observable, of, Subject } from 'rxjs';

import { DutyStatus } from '../../domain/dutyStatus';

import {environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'jDJjerhkwerKJER'
  })
};

@Injectable({
    providedIn: 'root'
})
export class DutyService {

    private apiUrl = environment.apiUrl ;

    constructor(private http: HttpClient) { }

    getDutyTypes():Observable<string[]> {
 		const url = `${this.apiUrl}/dutytypes`;
        return this.http.get<string[]>(url, httpOptions);
    }

    getDuties(user: string): Observable<DutyStatus[]> {
        const url = `${this.apiUrl}/duties?user=${user}`;
        return this.http.get<DutyStatus[]>(url, httpOptions);
    }

    setStatus(dutyStatus) {
    	const url = `${this.apiUrl}/duties`;
    	this.http.post<DutyStatus>(url, dutyStatus, httpOptions).subscribe();
    }

    deleteStatus(dutyStatus) {
    	const url = `${this.apiUrl}/duties?user=${dutyStatus.user}&date=${dutyStatus.date}&dutyType=${dutyStatus.dutyType}`;
    	this.http.delete(url, httpOptions).subscribe();
    }
}