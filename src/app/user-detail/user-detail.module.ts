import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import {
  MatListModule, MatCardModule, MatChipsModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { UserDetailComponent } from './user-detail.component';

const routes: Routes = [
  {
    path: '', component: UserDetailComponent
  }
];

@NgModule({
  declarations: [
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})

export class UserDetailModule { }
