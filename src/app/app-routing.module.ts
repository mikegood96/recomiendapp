import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContainerAppComponent} from './components/pages/container-app/container-app.component';
import {DetailsListComponent} from './components/lists/details-list/details-list.component';

const routes: Routes = [
  {
    path: '', component: ContainerAppComponent,
    children: [
      { path: 'home',
        loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
      { path: 'list/:id', component: DetailsListComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
    ]
  },

  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'search', loadChildren: () => import('./components/pages/search/search.module').then(m => m.SearchModule) },
  { path: 'share', loadChildren: () => import('./components/pages/share/share.module').then(m => m.ShareModule) },
  { path: 'register', loadChildren: () => import('./components/auth/registration/registration.module').then(m => m.RegistrationModule) },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
