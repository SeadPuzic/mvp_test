import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Report} from "../models/report";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  rootURL = environment.baseUrl;

  getUsers(): Observable<any[]> {
    return this.http.get(this.rootURL + 'users')
        .pipe(map((response: any) => response.data));
  }

  getProjects(): Observable<any[]> {
    return this.http.get(this.rootURL + 'projects')
        .pipe(map((response: any) => response.data));
  }

  getGateways(): Observable<any[]> {
    return this.http.get(this.rootURL + 'gateways')
        .pipe(map((response: any) => response.data));
  }

  generateReport(report: Report) {
    return this.http.post(this.rootURL + 'report', report)
        .pipe(map((response: any) => response.data));
  }
}
