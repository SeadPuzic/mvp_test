import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  largeSidebar = false;

  constructor() {
  }

  ngOnInit() {
  }

  sidebarSwitched(event: boolean) {
    this.largeSidebar = event;
  }
}
