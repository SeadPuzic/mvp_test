import { Component, OnInit } from '@angular/core';
import {  ApplicationService } from "../../services/application.service";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { Report } from "../../models/report";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {
  projects: any[] = [];
  activeProject: any = null;
  gateways: any[] = [];
  activeGateway: any = null;
  dateFrom: any = null;
  dateTo: any = null;
  data: any[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    forkJoin({
      projects: this.applicationService.getProjects().pipe(map(x => [{name: 'All projects'}, ...x])),
      gateways: this.applicationService.getGateways().pipe(map(x => [{name: 'All gateways'}, ...x]))
    })
        .subscribe(response => {
          const { projects, gateways } = response;
          this.projects = projects;
          this.gateways = gateways;
          this.activeProject = this.projects[0];
          this.activeGateway = this.gateways[0];
        });
  }

  generateReport() {
    const request: Report = {
        projectId: this.activeProject.name === 'All projects' ? '' : this.activeProject.projectId,
        gatewayId: this.activeGateway.name === 'All gateways' ? '' : this.activeGateway.gatewayId,
        from: this.dateFrom ? `${this.dateFrom.year}-0${this.dateFrom.month}-${this.dateFrom.day}`: '',
        to: this.dateTo ? `${this.dateTo.year}-0${this.dateTo.month}-${this.dateTo.day}`: '',
    }
    this.applicationService.generateReport(request).subscribe(res => {
        let criteriaId = 'projectId';
        let criteriaName = 'projectName';
        let invertedName = 'gatewayName';

        if (this.activeGateway.name === 'All gateways' && this.activeProject.name !== 'All projects') {
            criteriaId = 'gatewayId';
            criteriaName = 'gatewayName';
            invertedName = 'projectName';
        }

        this.data = this.mapData(res, criteriaId, criteriaName, invertedName);
    });

  }

  projectChanged(event: Event) {
      this.activeProject = event;
  }

  gatewayChanged(event: Event) {
      this.activeGateway = event;
  }

  mapData(allData: any[], criteriaId: string, criteriaName: string, invertedName: string) {
      const unique = [...new Set(allData.map((item: any) => item[criteriaId]))];
      const data: any[] = [];
      unique.forEach(element => {
          data.push({
              [criteriaName]: criteriaName === 'projectName' ? this.findProject(element) : this.findGateway(element),
              [criteriaId]: element,
              totalAmount: 0,
              data: [],
          })
      });

      data.forEach(d => {
          allData.forEach((r: any) => {
              if (r[criteriaId] === d[criteriaId]) {
                  r[invertedName] = invertedName === 'projectName' ? this.findProject(r.projectId) : this.findGateway(r.gatewayId);
                  d.totalAmount += r.amount;
                  d.data.push(r)
              }
          })
      })

      data.sort((a, b) => a[criteriaName] > b[criteriaName] ? 1 : -1);

      data.forEach(d => {
          d.data.sort((a: any, b: any) => {
              if (a[invertedName] === b[invertedName]) {
                  // Price is only important when cities are the same
                  return new Date(a.modified) > new Date(b.modified) ? 1 : -1;
              }
              return a[invertedName] > b[invertedName] ? 1 : -1;
          });
      });
      return data;
  }

    findProject(element: string) {
      return this.projects.find(project => project.projectId === element).name;
    }

    findGateway(element: string) {
      return this.gateways.find(gateway => gateway.gatewayId === element).name;
    }
}
