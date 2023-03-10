import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgSelectOption, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DeskService } from 'src/app/shared/services/desk.service';
import { RegistrationComponent } from '../registration/registration.component';
import { HttpClient } from '@angular/common/http';

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
      useExisting: forwardRef(() => RegistrationComponent),
      multi: true,
    }
  ]
})

export class LoginComponent implements OnInit, ControlValueAccessor {

  $function() {
    $('input, select').on('focus', function () {
      $(this).parent().find('.input-group-text').css('border-color', '#80bdff');
    });
    $('input, select').on('blur', function () {
      $(this).parent().find('.input-group-text').css('border-color', '#ced4da');
    });
  };

  @Input() userModel: userModel = { users: [] };
  users: User[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };
  editId: any;
  editUser: any;
  input!: any;
  faUser = faUser;
  faLock = faLock;
  user: any = {};

  constructor(private builder: FormBuilder, private service: DeskService,
    private authService: AuthService, private http: HttpClient,
    private router: Router, private toastr: ToastrService) { }

  writeValue(input: any): void {
    if (input) {
      this.users = input.users;
      this.form.patchValue({
        firstName: input.firstName,
        password: input.password,
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

  ngOnInit(): void {
    this.initForm();
    console.log(this.form.controls)
    if (this.user.id != '' && this.user.id != null) {
      this.service.getByEmployeeId(this.user.id).subscribe(response => {
        this.editUser = response;
        this.form.setValue({
          id: this.editUser.id, employeeId: this.editUser.employeeId,
          firstName: this.editUser.firstName,
          pasword: this.editUser.password,
        });
      });
    }
  }

  public form!: FormGroup;

  private initForm(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      firstName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    });
  }

  get firstName() {
    return this.form.controls['firstName']
  }

  get password() {
    return this.form.controls['password']
  }

  onLogin() {
    this.http.get<any>("http://127.0.0.1:8000/api/users")
      .subscribe({
        next: (response) => {
          const user = response.find((a: any) => {
            return a.firstName === this.form.value && a.password === this.form.value.password
          });
          if (user) {
            alert("Login Successful");
            this.form.reset();
            this.router.navigate(['nav']);
          }
          else {
            alert("user not found")
          }
        },
        error: (error) => {
          alert("Something went wrong")
        }
      });
  }

}

