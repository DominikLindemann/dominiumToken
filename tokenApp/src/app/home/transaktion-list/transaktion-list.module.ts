import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransaktionListPageRoutingModule } from './transaktion-list-routing.module';

import { TransaktionListPage } from './transaktion-list.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransaktionListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TransaktionListPage]
})
export class TransaktionListPageModule {}
