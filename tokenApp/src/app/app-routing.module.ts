import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'donate', loadChildren: () => import('./donate/donate.module').then( m => m.DonatePageModule) },
  { path: 'legalnotice', loadChildren: () => import('./legalnotice/legalnotice.module').then( m => m.LegalnoticePageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  { path: 'setting', loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule) },
  { path: 'tokeninfo', loadChildren: () => import('./tokeninfo/tokeninfo.module').then( m => m.TokeninfoPageModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full'  },
  {
    path: 'receive-detail',
    loadChildren: () => import('./receive-detail/receive-detail.module').then( m => m.ReceiveDetailPageModule)
  },
  {
    path: 'send-detail',
    loadChildren: () => import('./send-detail/send-detail.module').then( m => m.SendDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
