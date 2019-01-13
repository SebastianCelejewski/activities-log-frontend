import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Guid } from "guid-typescript";
import { Observable, of, Subject } from 'rxjs';

import { DutyStatus } from '../../domain/dutyStatus';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DutyService {

    private apiUrl = environment.apiUrl ;

    constructor(private http: HttpClient) { }

    getDutyTypes():Observable<string[]> {
 		const url = `${this.apiUrl}/dutytypes`;
        return this.http.get<string[]>(url);
    }

    getDuties(user: string): Observable<DutyStatus[]> {
        const url = `${this.apiUrl}/duties?user=${user}`;
        return this.http.get<DutyStatus[]>(url);
    }

    setStatus(dutyStatus) {
    	const url = `${this.apiUrl}/duties`;
    	this.http.post<DutyStatus>(url, dutyStatus).subscribe();
    }

    deleteStatus(dutyStatus) {
    	const url = `${this.apiUrl}/duties?user=${dutyStatus.user}&date=${dutyStatus.date}&dutyType=${dutyStatus.dutyType}`;
    	this.http.delete(url).subscribe();
    }
}