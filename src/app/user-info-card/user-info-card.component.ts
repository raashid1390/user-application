import { Component, Input, Output,EventEmitter } from '@angular/core';
import { User } from '../model/user-model';

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.css']
})

export class UserInfoCardComponent {
  @Input() selectedUser: User;
  @Output() close = new EventEmitter();

  closeClick() {
    this.close.emit();
  }
}
