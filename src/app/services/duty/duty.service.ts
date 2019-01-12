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

    private apiUrl = environment.apiUrl + "/duties";

    constructor(private http: HttpClient) { }

    getDuties(user: string): Observable<DutyStatus[]> {
        const url = `${this.apiUrl}?user=${user}`
        return this.http.get<DutyStatus[]>(url);
    }
}