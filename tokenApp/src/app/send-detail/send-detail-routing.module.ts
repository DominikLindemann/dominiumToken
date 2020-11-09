import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendDetailPage } from './send-detail.page';

const routes: Routes = [
  { path: '', component: SendDetailPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendDetailPageRoutingModule {}
