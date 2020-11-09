import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LegalnoticePageRoutingModule } from './legalnotice-routing.module';

import { LegalnoticePage } from './legalnotice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LegalnoticePageRoutingModule
  ],
  declarations: [LegalnoticePage]
})
export class LegalnoticePageModule {}
