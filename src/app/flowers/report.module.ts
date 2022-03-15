import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { FlowerComponent } from './flower/flower.component';
import {ApplicationService} from "../services/application.service";
import {HttpClientModule} from "@angular/common/http";
import {OtherComponent} from "./other/other.component";

@NgModule({
  declarations: [
    ReportComponent,
    FlowerComponent,
    OtherComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [ApplicationService],
  exports: [ReportComponent, FlowerComponent]
})
export class ReportModule { }
