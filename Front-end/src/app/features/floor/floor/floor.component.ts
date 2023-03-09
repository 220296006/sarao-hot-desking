import { Component, Inject, forwardRef, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormGroup, } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeskService } from 'src/app/shared/services/desk.service';
import { faUser, faBuilding, faDesktop, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FloorModel } from 'src/app/shared/models/floorModel';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { userModel } from 'src/app/shared/models/userModel';


@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FloorComponent),
      multi: true,
    }
  ]
})

export class FloorComponent implements OnInit, ControlValueAccessor {
  title = 'Please Select Desk'
  @Input() floors: FloorModel[] = [];
  @Input() users: userModel[] = [];
  editDesk: any;
  onChange: any = () => { };
  onTouched: any = () => { };
  editId: any;
  public dateTimePickerModule = new DateTimePickerModule;
  faUser = faUser;
  faBuilding = faBuilding;
  faDesktop = faDesktop;
  faMapMarker = faMapMarker;
  public form!: FormGroup;

  constructor(private service: DeskService, private builder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public floor: any) { }
  officeCapacity: number = 16;
  occupied: boolean = false;


  decrementCapacity() {
    if (this.officeCapacity <= 16 ) {
      this.officeCapacity--;
    }
  }
  
  writeValue(obj: any): void {
    if (obj) {
      this.floors = obj.floors;
      this.form.patchValue({
        id: obj.id,
        employeeId: obj.employeeId,
        firstName: obj.firstName,
        lastName: obj.lastName,
        building_name: obj.building_name,
        office_name: obj.office_name,
        floor_name: obj.floor_name,
        desk_id: obj.desk_id,
        bookingDate: obj.bookingDate,
      });
    }
  }
  registerOnChange(fn: (floors: FloorModel[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (floors: FloorModel[]) => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  ngOnInit(): void {
    this.initForm();
    console.log(this.form.controls)
    if (this.floor.id !='' && this.floor.id != null) {
      this.service.getByDeskId(this.floor.id).subscribe(response => {
        this.editDesk = response;
        this.form.setValue({
          id: this.editDesk.id, employeeId: this.editDesk.employeeId,
          firstName: this.editDesk.firstName, lastName: this.editDesk.lastName,
          building_name: this.editDesk.building_name, floor_name: this.editDesk.floor_name,
          office_name: this.editDesk.office_name, desk_id: this.editDesk.desk_id,
          bookingDate: this.editDesk.bookingDate,
        });
      });
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      employeeId: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      building_name: new FormControl('', Validators.required),
      floor_name: new FormControl('', Validators.required),
      office_name: new FormControl('', Validators.required),
      desk_id: new FormControl('', Validators.required),
      bookingDate: new FormControl(DateTimePickerModule),
    });
  }

  get building_name() {
    return this.form.controls['building_name']
  }
  get floor_name() {
    return this.form.controls['floor_name']
  }
  get office_name() {
    return this.form.controls['office_name']
  }
  get desk_id() {
    return this.form.controls['desk_id']
  }

  get bookingDate() {
    return this.form.controls['bookingDate']
  }

  get employee_id() {
    return this.form.controls['employeeId']
  }

  get id() {
    return this.form.controls['id']
  }

  @Input() floorOptions: Array<String> = ['First Floor', 'Second Floor'];

  @Input() officeOptions: Array<String> = ['Admin Office', 'Software Department Office', "Science Department Office"]

  @Input() deskOptions: Array<String> = ['Desk A', 'Desk B', 'Desk C'];

  @Input() buildingOptions: Array<String> = ['SARAO Black River Park', 'SARAO Nothern Cape']


  saveDeskData() {
    if (this.form.value) {
      const editId = this.form.getRawValue().id;
      if (editId != '' && editId != null) {
        this.service.updateByDeskId(editId, this.form.getRawValue()).subscribe(response => {
          this.closeDeskPop();
        });
      } else {
        this.service.saveDeskData(this.form.value).subscribe(response => {
          this.decrementCapacity();
          this.closeDeskPop();
        });
      }
    }
    console.log('Form Valid:', this.form.valid);
    console.log('Form Values:', this.form.value);
  }
  closeDeskPop() {
    this.dialog.closeAll();
  }
}
