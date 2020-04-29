import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard} from '../../shared/guards/auth.guard';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: 'lists',
        loadChildren: () =>
          import ('../lists/lists/lists.module').then(
          m => m.ListsModule)
      },
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
