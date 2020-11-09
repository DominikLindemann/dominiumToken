import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    TransactionItemComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TransactionItemComponent,
    SpinnerComponent
  ]
})
export class ComponentsModule { }
