import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddUserInfoComponent } from './add-user-info/add-user-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(public dialog: MatDialog) { }

  addUserDialog() {
    const dialogRef = this.dialog.open(AddUserInfoComponent, {
      width: '50%',
    });
  }
}
