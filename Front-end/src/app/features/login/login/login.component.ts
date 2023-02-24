import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { faUser, faEnvelope, faPhone, faUserTie, faLock } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { DeskService } from 'src/app/shared/services/desk.service';

export interface userModel {
  users: User[];
}
export interface User {
    id: number,
    employeeId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    position: string;
    password: string;
    passwordConfirmation: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginComponent),
      multi: true,
    }
  ]
})
export class LoginComponent implements OnInit, ControlValueAccessor {
  
  @Input() userModel: userModel = { users: [] };
  users: User[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };
  editId: any;
  editUser: any;
  input!: any;
  faUser = faUser;
  faEnvelope = faEnvelope; 
  faPhone = faPhone;
  faUserTie = faUserTie;
  faLock = faLock;
  sarao: string = "C:/Users/thabi/Desktop/Python/sarao-hot-desking/Front-end/src/assets/sarao.png";

  constructor(private builder: FormBuilder, private service: DeskService) { }
  user: any = {};
   writeValue(input: any): void {
    if (input) {
      this.users = input.users;
      this.form.patchValue({
        employeeId: input.employeeId,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phoneNumber: input.phoneNumber,
        position: input.position,
        password: input.password,
        passwordConfirmation: input.passwordConfirmation
      })
    }
  }
  registerOnChange(fn: (users: User[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: (users: User[]) => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

    $function () {
    $('input, select').on('focus', function () {
        $(this).parent().find('.input-group-text').css('border-color', '#80bdff');
    });
    $('input, select').on('blur', function () {
        $(this).parent().find('.input-group-text').css('border-color', '#ced4da');
    });
};

ngOnInit(): void {
  if (this.user.id != '' && this.user.id != null){
  this.service.getByEmployeeId(this.user.id).subscribe(response => {
    this.editUser = response;
    this.form.setValue({
      id: this.editUser.id, employeeId: this.editUser.employeeId, firstName: this.editUser.firstName, lastName: this.editUser.lastName,
      email: this.editUser.email, phoneNumber: this.editUser.phoneNumber, position: this.editUser.position, password: this.editUser.password,
      passwordConfirmation: this.editUser.passwordConfirmation
    });
  });
}
console.log('values', this.user.value) 
}

 form: FormGroup = this.builder.group({
  id: new FormControl({value: '', disabled: true}),
  employeeId: new FormControl('', Validators.required),
  firstName: new FormControl('', Validators.required),
  lastName:new FormControl('', Validators.required),
  email:new FormControl('', Validators.required),
  phoneNumber:new FormControl('', Validators.required),
  position: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required),
  passwordConfirmation: new FormControl('', Validators.required)
});


get employeeId() {
  return this.form.controls['employeeId']
}

get firstName() {
  return this.form.controls['firstName']
}

get lastName() {
  return this.form.controls['lastName']
}
 
get email(){
  return this.form.controls['email']
}

get phoneNumber(){
  return this.form.controls['phoneNumber']
}

get position() {
   return this.form.controls['position']
 }

get password(){
  return this.form.controls['password']
}

get passwordConfirmation(){
  return this.form.controls['passwordConfirmation']
}

@Input() positionOptions: Array<string> = ["Administrator", "Junior Software Engineer", "Senior Software Engineer", "Scrum Master", "Accountant", "Project Manager", "Scientist"];


saveUserData() {
  if (this.form.value) {
    const editId = this.form.getRawValue().id;
    if (editId != '' && editId != null) {
      this.service.updateByEmployeeId(editId, this.form.getRawValue()).subscribe(response => {
      });
    } else {
      this.service.saveUserData(this.form.value).subscribe(response => {
      });  
  console.log('Form Valid:', this.form.valid)
  console.log('User Values', this.form.value)
    }
  }
}
}
  
