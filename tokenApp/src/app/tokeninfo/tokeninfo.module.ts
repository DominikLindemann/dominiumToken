import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokeninfoPageRoutingModule } from './tokeninfo-routing.module';

import { TokeninfoPage } from './tokeninfo.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TokeninfoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TokeninfoPage]
})
export class TokeninfoPageModule {}
