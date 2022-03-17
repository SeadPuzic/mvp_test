import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})

export class ReportTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() fullHeight: boolean = false;
  @Input() reportTitle: string = '';
  @Input() totalSum: number = 0;
  activeIndex: number | null = null;
  constructor() {}

  ngOnInit() {}

  setActiveIndex(index: number) {
    this.activeIndex = index === this.activeIndex ? null : index;
  }
}
