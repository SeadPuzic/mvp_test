import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {ReportModule} from "./components/report.module";
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./shared/components/home/home.component";
import {NavbarComponent} from "./shared/components/navbar/navbar.component";
import {NotFoundComponent} from "./shared/components/notFound/notFound.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportModule,
    NgbModule,
    NgbDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
