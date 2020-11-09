import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenPage } from './token.page';

const routes: Routes = [
  {
    path: '',
    component: TokenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenPageRoutingModule {}
