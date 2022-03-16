import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { SelectBoxComponent } from '../shared/components/select-box/select-box.component';
import {ApplicationService} from "../services/application.service";
import {HttpClientModule} from "@angular/common/http";
import {OtherComponent} from "./other/other.component";
import {FormsModule} from "@angular/forms";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    ReportComponent,
    SelectBoxComponent,
    OtherComponent,
  ],
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        NgbDatepickerModule
    ],
  providers: [ApplicationService],
  exports: [ReportComponent, SelectBoxComponent]
})
export class ReportModule { }
