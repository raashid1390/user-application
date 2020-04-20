import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user-model';
import { userJson } from '../service/user-data';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent {

  userList: Array<User> = new Array<User>();
  isUserSelected: boolean = false;
  selectedUser: User;
  subscriber: any;

  constructor(userService: UserService) {
    this.userList = userJson;
    this.subscriber = userService.getUser().subscribe(userList => {
      this.userList = userList;
    })
  }

  setSelectedUser(user: User) {
    this.isUserSelected = true;
    this.selectedUser = user;
  }

  closeClick() {
    this.isUserSelected = false;
  }
}
