import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent },
  { path: 'admin', loadChildren: () => import('../../admin/admin.module').then(m => m.AdminModule) },
  { path: 'search', loadChildren: () => import('../search/search.module').then(m => m.SearchModule) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
