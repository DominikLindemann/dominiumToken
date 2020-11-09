import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokenPageRoutingModule } from './token-routing.module';

import { TokenPage } from './token.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TokenPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TokenPage]
})
export class TokenPageModule {}
