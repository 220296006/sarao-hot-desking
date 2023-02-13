import { Component, Inject, forwardRef, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators, FormGroup, FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
export interface officeModel {
  floors: Floor[];
}

export interface Floor {
  floor_id: number
  floor_name: string
  building_name: string
  offices: Office[]
}

export interface Office {
  office_name: string
  office_id: number
  floor_id: number
  capacity: number
  desks: Desk[]
}

export interface Desk {
  desk_id: string
  office_id: number
  occupied: boolean
}

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css'],
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
  @Input() officeModel: officeModel = { floors: [] };
  floors : Floor[] = [];
  editDesk: any;
  onChange: any = () => {};
  onTouched: any = () => {};


  constructor(private service: UserService, private builder: NonNullableFormBuilder, private dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public desk: any) { }
  
  writeValue(obj: any): void {
    if (obj) {
      this.floors = obj.floors;
      this.form.patchValue({
        building_name: obj.building_name,
        floor_id: obj.floor_id,
        office_name: obj.office_name,
        floor_name: obj.floor_name,
        desk_id: obj.desk_id,
      });
    }
  }
  registerOnChange(fn: (floors: Floor[]) => void): void {
this.onChange = fn;
  }

  registerOnTouched(fn: (floors: Floor[]) => void): void {
this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {

  }

  ngOnInit() {
      if (this.desk.floor_id != '' && this.desk.floor_id != null) {
        this.service.getById(this.desk.floor_id).subscribe(response => {
          this.editDesk = response;
          this.form.setValue({
            floor_id: this.editDesk.floor_id, building_name: this.editDesk.building_name, floor_name: this.editDesk.floor_name, office_name: this.editDesk.office_name, desk_id: this.editDesk.desk_id
          });
        });
      }
    
  }

  form: FormGroup = this.builder.group({
    building_name: new FormControl('', Validators.required),
    floor_id: new FormControl('', Validators.required),
    floor_name: new FormControl('', Validators.required),
    office_name: new FormControl('', Validators.required),
    desk_id: new FormControl('', Validators.required),
  });
  
  get floor_id(){
    return this.form.controls['floor_id']
  }
  get building_name(){
    return this.form.controls['building_name']
  }
  get floor_name(){
    return this.form.controls['floor_name']
  }
  get office_name(){
    return this.form.controls['office_name']
  }
  get desk_id(){
    return this.form.controls['desk_id']
  }


  createForm(floors: Floor[]) {
    for (const floor of floors) {
      this.form.addControl(floor.floor_name, this.builder.control(''));
    }
  }

  @ Input() floorIdOptions: Array<number> = [1, 2];

  @Input() floorOptions: Array<string> = ['First Floor', 'Second Floor'];

  @Input() officeOptions: Array<string> = ['Admin_Office', 'Office A','Office B']
  
  @Input() deskOptions: Array<String>= ['Desk A','Desk B', 'Desk C'];
 
  @Input()  buildingOptions: Array<String> = ['SARAO Black River Park','SARAO Nothern Cape' ]
  


  saveUserData() {
    if (this.form.value) {
      const editId = this.form.getRawValue().floor_id;
      if (editId != '' && editId != null) {
        this.service.updateById(editId, this.form.getRawValue()).subscribe(response =>{
          this.closeUserPop();
        });
      } else {
        this.service.saveUserData(this.form.value).subscribe(response => {
          this.closeUserPop();
        });
      }
    }
    console.log('Form Valid:', this.form.valid)
    console.log('Form Values:', this.form.value)
  }

  redirecttolist() { }

  closeUserPop(){
    this.dialog.closeAll();
  }
}