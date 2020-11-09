import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveDetailPage } from './receive-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiveDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiveDetailPageRoutingModule {}
