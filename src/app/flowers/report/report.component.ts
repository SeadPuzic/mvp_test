import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../services/application.service";
import {forkJoin, Observable, of} from "rxjs";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {
  flowers = [];
  users: Observable<any[]> = new Observable<[]>();
  projects: Observable<any[]> = new Observable<[]>();
  gateways: Observable<any[]> = new Observable<[]>();
  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.users = this.applicationService.getUsers();
    this.projects = this.applicationService.getProjects();
    this.gateways = this.applicationService.getGateways();
  }
}
