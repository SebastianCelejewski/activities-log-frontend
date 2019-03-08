import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Guid } from "guid-typescript";
import { Observable, of, Subject } from 'rxjs';

import { DutyStatus } from '../../domain/dutyStatus';

import { environment } from '../../../environments/environment';

import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DutyService {

    private apiUrl = environment.apiUrl ;

    constructor(private http: HttpClient, private authService: AuthService) { }

    getDutyTypes():Observable<string[]> {
 		const url = `${this.apiUrl}/dutytypes`;
        return this.http.get<string[]>(url, this.getHttpOptions());
    }

    getDuties(user: string): Observable<DutyStatus[]> {
        const url = `${this.apiUrl}/duties?user=${user}`;
        return this.http.get<DutyStatus[]>(url, this.getHttpOptions());
    }

    setStatus(dutyStatus) {
    	const url = `${this.apiUrl}/duties`;
    	this.http.post<DutyStatus>(url, dutyStatus, this.getHttpOptions())
        .subscribe();
    }

    deleteStatus(dutyStatus) {
    	const url = `${this.apiUrl}/duties?user=${dutyStatus.user}&date=${dutyStatus.date}&dutyType=${dutyStatus.dutyType}`;
    	this.http.delete(url, this.getHttpOptions())
        .subscribe();
    }

    getHttpOptions() {
        var authId = this.authService.getAuthId();

        var httpOptions = {
            headers: new HttpHeaders({
                'Authorization': authId,
                'x-api-key': environment.apiKey
            })
        };

        return httpOptions;
    }
}