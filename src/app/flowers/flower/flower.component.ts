import {Component, Input, OnInit} from '@angular/core';
import {Flower} from "../../models/flower";

@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.scss']
})
export class FlowerComponent implements OnInit {

  @Input() flower: Flower = new Flower();
  @Input() isLoggedIn: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

}
