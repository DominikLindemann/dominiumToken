import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      { path: 'token',
        loadChildren: () => import('./token/token.module').then( m => m.TokenPageModule) },
      { path: 'transaktion-list',
        loadChildren: () => import('./transaktion-list/transaktion-list.module').then( m => m.TransaktionListPageModule) },
      {
        path: '', redirectTo: '/home/tabs/token', pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/tabs/token',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
