import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Inject, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { faUser, faEnvelope, faPhone, faUserTie, faLock } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { DeskService } from 'src/app/shared/services/desk.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegistrationComponent),
      multi: true,
    }
  ]
})
export class RegistrationComponent implements OnInit, ControlValueAccessor {

  @Input() userModel: userModel = { users: [] };

  @Output() formSubmit: EventEmitter<{ employeeId: string; firstName: string; position: string }> = new EventEmitter();
  
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

  public form!: FormGroup;

  constructor(private builder: FormBuilder, private service: DeskService,
    private authService: AuthService,
    private router: Router, private toastr: ToastrService) { }

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

  $function() {
    $('input, select').on('focus', function () {
      $(this).parent().find('.input-group-text').css('border-color', '#80bdff');
    });
    $('input, select').on('blur', function () {
      $(this).parent().find('.input-group-text').css('border-color', '#ced4da');
    });
  };

  ngOnInit(){
    //this.formSubmit.emit();
    this.initForm();
    console.log(this.form.controls)
    if (this.user.id != '' && this.user.id != null) {
      this.service.getByEmployeeId(this.user.id).subscribe(response => {
        this.editUser = response;
        this.form.setValue({
          id: this.editUser.id, employeeId: this.editUser.employeeId,
          firstName: this.editUser.firstName,
          lastName: this.editUser.lastName, 
          email: this.editUser.email,
          phoneNumber: this.editUser.phoneNumber,
          position: this.editUser.position, password: this.editUser.password,
          passwordConfirmation: this.editUser.passwordConfirmation,
        });
      });
    }
  }

  // onSubmit() {
  // const { employeeId, firstName, position } = this.form.value;
  // this.formSubmit.emit({ employeeId, firstName, position });
  // console.log('user:', this.form.value);
  // }


private initForm(): void {
  this.form = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    employeeId: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    phoneNumber: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    password: new FormControl('',Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    passwordConfirmation: new FormControl('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]))
  });
}

  get employeeId() {
    return this.form.controls['employeeId']
  }

  get firstName() {
    return this.form.controls['firstName']
  }

  get lastName() {
    return this.form.controls['lastName']
  }

  get email() {
    return this.form.controls['email']
  }

  get phoneNumber() {
    return this.form.controls['phoneNumber']
  }

  get position() {
    return this.form.controls['position']
  }

  get password() {
    return this.form.controls['password']
  }

  get passwordConfirmation() {
    return this.form.controls['passwordConfirmation']
  }

  @Input() positionOptions: Array<string> = ["Administrator", "Junior Software Engineer",
    "Senior Software Engineer", "Scrum Master", "Accountant", "Project Manager", "Scientist"];


  onRegistration() {
    if (this.form.value) {
      const editId = this.form.getRawValue().id;
      if (editId != '' && editId != null) {
        this.service.updateByEmployeeId(editId, this.form.getRawValue()).subscribe(response => {
          this.toastr.success("Registered successfully")
          this.router.navigate(['/home'])
        });
      } else {
        this.service.onRegistration(this.form.value).subscribe(response => {
        });
      }
      console.log('Form Valid:', this.form.valid);
      console.log('Form Values:', this.form.value);
    const token = this.authService.authUser(this.form.value);
    if (token) {
      localStorage.setItem('token', token.firstName)
      this.router.navigate(['/home'])
      console.log('Login Success')
    } else {
      console.log('Login Failed', this.form.value)
    }
  }
}
}

