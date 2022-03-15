import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./shared/components/home/home.component";
import {ReportComponent} from "./flowers/report/report.component";
import {NotFoundComponent} from "./shared/components/notFound/notFound.component";
import {OtherComponent} from "./flowers/other/other.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: ReportComponent},
      {path: 'users', component: OtherComponent},
      {path: 'projects', component: OtherComponent},
      {path: 'gateways', component: OtherComponent},
      {path: 'report', component: ReportComponent},
    ]
  },
  {path: '**', redirectTo: '/not-found'},
  {path: 'not-found', component: NotFoundComponent},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
