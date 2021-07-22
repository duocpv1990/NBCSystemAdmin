import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-use-service',
  templateUrl: './use-service.component.html',
  styleUrls: ['./use-service.component.scss']
})
export class UseServiceComponent implements OnInit {
  useServices = [];

  constructor() { }

  ngOnInit(): void {
    this.useServices.length = 3;
  }

}
