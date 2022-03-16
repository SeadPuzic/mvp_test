import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {

  @Input() currentValue: any | null = null;
  @Input() inputValue: string = 'name';
  @Input() data: any[] | null = [];
  @Output() currentValueChanged = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }
}
