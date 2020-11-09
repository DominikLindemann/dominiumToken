import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendDetailPageRoutingModule } from './send-detail-routing.module';

import { SendDetailPage } from './send-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendDetailPageRoutingModule
  ],
  declarations: [SendDetailPage]
})
export class SendDetailPageModule {}
