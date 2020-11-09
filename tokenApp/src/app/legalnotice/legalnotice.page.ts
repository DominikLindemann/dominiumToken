import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-legalnotice',
  templateUrl: './legalnotice.page.html',
  styleUrls: ['./legalnotice.page.scss'],
})
export class LegalnoticePage implements OnInit {
  constructor() { }

  public segmentName = 'impressum';
  public segmentList;

  ngOnInit() {
    this.segmentList = this.segmentName;
  }

  onFilterChange(event: CustomEvent<SegmentChangeEventDetail>) {
    this.segmentName = event.detail.value;
   }

}

