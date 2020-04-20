import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'user-list',
    loadChildren: './user-list/user-list.module#UserListModule'
  },
  {
    path: 'user-detail',
    loadChildren: './user-detail/user-detail.module#UserDetailModule'
  },
  {
    path: '',
    redirectTo: '/user-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
