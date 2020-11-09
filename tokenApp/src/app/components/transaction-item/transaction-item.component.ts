import { Component, OnInit, Input } from '@angular/core';
import { TransactionDisplay } from '../../model/transactionDisplay.model';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
})
export class TransactionItemComponent implements OnInit {

  @Input()
  transaction: TransactionDisplay;


  constructor() { }

  ngOnInit() {
  }

}
