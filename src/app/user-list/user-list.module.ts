import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserListComponent } from './user-list.component';
import { Routes, RouterModule } from '@angular/router';

import { MatListModule, MatCardModule, MatChipsModule, MatIconModule, MatButtonModule } from '@angular/material';
import { UserInfoCardComponent } from '../user-info-card/user-info-card.component';

const routes: Routes = [
  {
    path: '', component: UserListComponent
  }
];

@NgModule({
  declarations: [
    UserListComponent,
    UserInfoCardComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})

export class UserListModule { }
