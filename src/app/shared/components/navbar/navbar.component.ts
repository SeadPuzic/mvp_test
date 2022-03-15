import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() largeSidebar = false;
  @Output() largeSidebarSwitched = new EventEmitter<boolean>();
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileScreen = window.innerWidth <= 768;
  }
  isMobileScreen = false;
  showMenu = false;
  avatar: string = 'John Doe';

  constructor() {}

  ngOnInit() {
    this.isMobileScreen = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleSidebar() {
    this.largeSidebar = !this.largeSidebar;
    this.largeSidebarSwitched.emit(this.largeSidebar);
  }
}
