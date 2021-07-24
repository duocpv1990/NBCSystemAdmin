import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-care-history',
  templateUrl: './care-history.component.html',
  styleUrls: ['./care-history.component.scss']
})
export class CareHistoryComponent implements OnInit {
  careHistories = [];

  constructor() { }

  ngOnInit(): void {
    this.careHistories.length = 3;
  }

}
