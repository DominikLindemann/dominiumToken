import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiveDetailPageRoutingModule } from './receive-detail-routing.module';

import { ReceiveDetailPage } from './receive-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiveDetailPageRoutingModule
  ],
  declarations: [ReceiveDetailPage]
})
export class ReceiveDetailPageModule {}
