import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [{ path: '', component: LoginComponent},
  { path: 'register', loadChildren: () => import('../registration/registration.module').then(m => m.RegistrationModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
