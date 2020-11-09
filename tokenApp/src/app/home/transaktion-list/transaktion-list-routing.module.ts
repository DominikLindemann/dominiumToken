import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransaktionListPage } from './transaktion-list.page';

const routes: Routes = [
  {
    path: '',
    component: TransaktionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransaktionListPageRoutingModule {}
