import { Component, Input, Inject, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user-model';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { STATES } from '../service/states-data';
import { SKILLS } from '../service/skills-data';
import { CONSTANTS_DATA } from '../service/constant-data';

@Component({
  selector: 'app-add-user-info',
  templateUrl: './add-user-info.component.html',
  styleUrls: ['./add-user-info.component.css']
})

export class AddUserInfoComponent implements OnInit {
  userForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    state: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
    organisationName: new FormControl('', [Validators.required]),
    skills: new FormControl('', [Validators.required]),
  });

  user: User = new User();
  stateOptions = STATES.map(state => state.name);
  skillsList = SKILLS;
  myControl = new FormControl();
  filteredOptions: Observable<any>;

  constructor(public dialogRef: MatDialogRef<AddUserInfoComponent>,
    public userService: UserService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.filteredOptions = this.userForm.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value.state))
      );
  }

  private _filter(value: string): any[] {
    if (value == undefined)
      value = '';
    if (value.length <= 2)
      return this.stateOptions;
    const filterValue = value.toLowerCase();
    return this.stateOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  onAddClick(): void {
    if (!this.userForm.valid) {
      let controls = Object.keys(this.userForm.controls);
      for (let index = 0; index < controls.length; index++) {
        const element = controls[index];
        this.userForm.controls[element].markAsTouched();
        this.getErrorMessage(element);
      }
      return;
    }
    let user: User = this.userForm.value;
    user.id = Math.floor(Math.random() * 1000);
    user.userImage = CONSTANTS_DATA.DEFAULT_USER_IMAGE;
    this.userService.setUser(user);
    this.dialogRef.close();
    this.snackBar.open(CONSTANTS_DATA.SUCCESS_MESSAGE.USER_ADDED, '', { duration: 2000 });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  getErrorMessage(formControl: string) {
    let errorMessage = '';
    switch (formControl) {
      case 'userName':
        if (this.userForm.controls.userName.hasError('required')) {
          errorMessage = CONSTANTS_DATA.VALIDATION_MESSAGE.USER_NAME_REQUIRED;
        }
        break;
      case 'email':
        if (this.userForm.controls.email.hasError('required')) {
          errorMessage = CONSTANTS_DATA.VALIDATION_MESSAGE.EMAIL_IS_REQUIRED;
        } else {
          errorMessage = this.userForm.controls.email.hasError('email') ? CONSTANTS_DATA.VALIDATION_MESSAGE.NOT_A_VALID_EMAIL : '';
        }
        break;
      case 'state':
        if (this.userForm.controls.state.hasError('required')) {
          errorMessage = CONSTANTS_DATA.VALIDATION_MESSAGE.STATE_IS_REQUIRED;
        }
        break;
      case 'birthdate':
        if (this.userForm.controls.birthdate.hasError('required')) {
          errorMessage = CONSTANTS_DATA.VALIDATION_MESSAGE.DATE_OF_BIRTH_REQUIRED;
        }
        break;
      case 'pincode':
        if (this.userForm.controls.pincode.hasError('required')) {
          errorMessage = CONSTANTS_DATA.VALIDATION_MESSAGE.PINCODE_IS_REQUIRED;
        }
        break;
      case 'organisationName':
        if (this.userForm.controls.organisationName.hasError('required')) {
          errorMessage = CONSTANTS_DATA.VALIDATION_MESSAGE.ORGANIZATION_IS_REQUIRED;
        }
        break;
      case 'skills':
        if (this.userForm.controls.skills.hasError('required')) {
          errorMessage = CONSTANTS_DATA.VALIDATION_MESSAGE.PLEASE_SELECT_AT_LEAST_ONE_SKILL;
        }
        break;

      default:
        break;
    }
    return errorMessage;
  }
}
