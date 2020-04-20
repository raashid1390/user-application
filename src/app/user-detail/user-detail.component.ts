import { Component, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user-model';
import { MatTableDataSource, MatPaginator, MatSort, Sort } from '@angular/material';
import { userJson } from '../service/user-data';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent {

  userList: Array<User> = new Array<User>();
  subscriber: any;

  displayedColumns: string[] = ['userImage', 'userName', 'email', 'birthdate', 'organisationName', 'skills'];
  dataSource = new MatTableDataSource<User>(this.userList);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(userService: UserService) {
    this.userList = userJson;
    this.dataSource = new MatTableDataSource<User>(this.userList);
    this.subscriber = userService.getUser().subscribe(userList => {
      this.userList = userList;
      this.dataSource = new MatTableDataSource<User>(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
