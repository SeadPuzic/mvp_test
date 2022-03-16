import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../services/application.service";
import {forkJoin, Observable, of} from "rxjs";
import {map, mergeMap} from "rxjs/operators";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Report} from "../../models/report";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {
  flowers = [];
  users: any[] = [];
  activeUser: any = null;
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
      users: this.applicationService.getUsers().pipe(map(x => [{email: 'All users'}, ...x])),
      projects: this.applicationService.getProjects().pipe(map(x => [{name: 'All projects'}, ...x])),
      gateways: this.applicationService.getGateways().pipe(map(x => [{name: 'All gateways'}, ...x]))
    })
        .subscribe(response => {
          const {users, projects, gateways} = response;
          this.users = users;
          this.projects = projects;
          this.gateways = gateways;
          this.activeUser = this.users[0];
          this.activeProject = this.projects[0];
          this.activeGateway = this.gateways[0];
        });
  }

  generateReport() {
    console.log(this.activeProject);
    console.log(this.activeGateway);
    console.log(this.dateFrom);
    console.log(this.dateTo);
    const request: Report = {
        projectId: this.activeProject.name === 'All projects' ? '' : this.activeProject.projectId,
        gatewayId: this.activeGateway.name === 'All gateways' ? '' : this.activeGateway.gatewayId,
        from: this.dateFrom ? `${this.dateFrom.year}-0${this.dateFrom.month}-${this.dateFrom.day}`: '',
        to: this.dateTo ? `${this.dateTo.year}-0${this.dateTo.month}-${this.dateTo.day}`: '',
    }
    this.applicationService.generateReport(request).subscribe(res => {
        let criteria = 'projectId';

        if (this.activeGateway.name === 'All gateways' && this.activeProject.name !== 'All projects') {
            criteria = 'gatewayId';
        }

        const unique = [...new Set(res.map((item: any) => item[criteria]))];
        const data: any[] = [];

        if (criteria === 'projectId') {

            unique.forEach(element => {
                data.push({
                    projectName: this.projects.find(project => project.projectId === element).name,
                    projectId: element,
                    totalAmount: 0,
                    data: [],
                })
            });


            data.forEach(d => {
                res.forEach((r: any) => {
                    if (r.projectId === d.projectId) {
                        r.gatewayName = this.gateways.find(gateway => gateway.gatewayId === r.gatewayId).name;
                        d.totalAmount += r.amount;
                        d.data.push(r)
                    }
                })
            })

            data.sort((a, b) => a.projectName > b.projectName ? 1 : -1);

            data.forEach(d => {
                d.data.sort((a: any, b: any) => {
                    if (a.gatewayName === b.gatewayName) {
                        // Price is only important when cities are the same
                        return new Date(a.modified) > new Date(b.modified) ? 1 : -1;
                    }
                    return a.gatewayName > b.gatewayName ? 1 : -1;
                });
            });
            this.data = data;
            console.log(data);
        } else {
            unique.forEach(element => {
                data.push({
                    gatewayName: this.gateways.find(gateway => gateway.gatewayId === element).name,
                    gatewayId: element,
                    totalAmount: 0,
                    data: [],
                })
            });


            data.forEach(d => {
                res.forEach((r: any) => {
                    if (r.gatewayId === d.gatewayId) {
                        r.projectName = this.projects.find(project => project.projectId === r.projectId).name;
                        d.totalAmount += r.amount;
                        d.data.push(r)
                    }
                })
            })

            data.sort((a, b) => a.gatewayName > b.gatewayName ? 1 : -1);

            data.forEach(d => {
                d.data.sort((a: any, b: any) => {
                    if (a.projectName === b.projectName) {
                        // Price is only important when cities are the same
                        return new Date(a.modified) > new Date(b.modified) ? 1 : -1;
                    }
                    return a.projectName > b.projectName ? 1 : -1;
                });
            });
            console.log(data);
            this.data = data;
        }
    });

  }

  projectChanged(event: Event) {
      this.activeProject = event;
  }

  gatewayChanged(event: Event) {
      this.activeGateway = event;
      console.log(this.activeGateway);
  }
}
