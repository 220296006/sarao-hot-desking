import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, OnInit, LOCALE_ID } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FloorComponent } from '../../floor/floor/floor.component';
import { DeskService } from 'src/app/shared/services/desk.service';


export interface userModel {
  users: User[];
}
export interface User {
  id: number; 
  employee_id: number;
  employee_name: string;
  bookingDate: Date;
  position: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FloorComponent),
      multi: true,
    }
  ]
})

export class UserComponent implements OnInit, ControlValueAccessor {
  title = 'Please Login'
  @Input() userModel: userModel = { users: [] };
  users: User[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };
  editId: any;
  editUser: any;
  public dateValue: Date = new Date("01/02/2023 09:00")
  public minDate: Date = new Date("01/01/2023 09:00")
  public maxDate: Date = new Date("15/12/2023 18:00")


  constructor(private builder: NonNullableFormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public user: any, private service: DeskService) { }


  writeValue(obj: any): void {
    if (obj) {
      this.users = obj.users;
      this.form.patchValue({
        employee_id: obj.employee_id,
        employee_name: obj.employee_name,
        position: obj.position,
        bookingDate: obj.bookingDate,
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
    if (this.user.employee_id != '' && this.user.employee_id != null) {
      this.service.getByEmployeeId(this.user.employee_id).subscribe(response => {
        this.editUser = response;
        this.form.setValue({
         employee_id: this.editUser.employee_id, employee_name: this.editUser.employee_name, position: this.editUser.position, bookingDate: this.editUser.bookingDate
        })
      });
    }
  }

  form: FormGroup = this.builder.group({
    employee_id: new FormControl('', Validators.required),
    employee_name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    bookingDate: new FormControl('', Validators.required),
  })

  creatForm(users: User[]) {
    for (const user of users) {
      this.form.addControl(user.employee_name, this.builder.control(''))
    }
  }

  get employee_id() {
    return this.form.controls['employee_id'];
  }

  get employee_name() {
    return this.form.controls['employee_name'];
  }

  get bookingDate() {
    return this.form.controls['bookingDate']
  }

  get position() {
    return this.form.controls['position'];
  }

  @Input() PositionOptions: Array<string> = ['Junior Software Engineer', 'Senior Software Engineer', 'Manager Software Department', 'Administrator']


  saveUserData() {
    if (this.form.value) {
      const editId = this.form.getRawValue().employee_id;
      if (editId != '' && editId != null) {
        this.service.updateByEmployeeId(editId, this.form.getRawValue()).subscribe(_response => {
          this.closeUserPop();
        });
      } else {
        this.service.saveUserData(this.form.value).subscribe(_response => {
          this.closeUserPop();
        });
      }
    }
    console.log('Form Valid:', this.form.valid)
    console.log('User Values', this.form.value)
  }

  closeUserPop() {
    this.dialog.closeAll();
  }

}
