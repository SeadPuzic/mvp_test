import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/users',
    title: 'Users',
    icon: 'users.svg'
  },
  {
    path: '/projects',
    title: 'Projects',
    icon: 'projects.svg'
  },
  {
    path: '/gateways',
    title: 'Gateways',
    icon: 'gateways.svg'
  },
  {
    path: '/report',
    title: 'Report',
    icon: 'reports.svg'
  },
  {
    path: '/sidebar',
    title: 'Sidebar',
    icon: 'sidebar.svg'
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() largeSidebar = false;
  @Output() largeSidebarSwitched = new EventEmitter<boolean>();
  menuItems: RouteInfo[] = ROUTES;
  selectedIndex: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES;
    switch (this.router.url) {
      case '/users': this.selectedIndex = 0; break;
      case '/projects': this.selectedIndex = 1; break;
      case '/gateways': this.selectedIndex = 2; break;
      case '/report': this.selectedIndex = 3; break;
      case '/sidebar': this.selectedIndex = 4; break;
      default: this.selectedIndex = null;
    }
  }

  changeSidebar() {
    this.largeSidebar = !this.largeSidebar;
    this.largeSidebarSwitched.emit(this.largeSidebar);
  }

  setIndex(index: number) {
    this.selectedIndex = index;
  }
}