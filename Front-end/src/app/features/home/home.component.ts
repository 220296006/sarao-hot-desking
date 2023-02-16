import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { officeModel } from 'src/app/shared/models/officeModel';
import { FloorComponent } from '../floor/floor/floor.component';
import { MatTableDataSource } from '@angular/material/table';
import { UserComponent } from '../user/user/user.component';
import { userModel } from 'src/app/shared/models/userModel';
import { DeskService } from 'src/app/shared/services/desk.service';

export interface User {
  id: number;
  employee_id: number;
  employee_name: string;
  bookingDate: Date;
  position: string;
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
  employee_id: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'SARAO Hotdesking';
  finalDeskData: any;
  officeModel: any;
  finalUserData: any;
  userModel: any;
  finalUserDataTable: any[] = [];

  displayedColumns: string[] = ["employee_id", "employee_name", "position", "bookingDate", "action",];
 displayedColumns2: string[] = ["employee_id", "floor_id", "floor_name", "building_name", "office_name", "desk_id", "capacity", "occupied", "action"]
  constructor(private service: DeskService, private dialog: MatDialog) { }

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  deskData!: officeModel[];
  userData!: userModel[];

  ngOnInit() {
    this.loadDesk();
    this.loadUser();
  }

  userLogin(id: any) {
    const _create = this.dialog.open(UserComponent, {
      width: '300px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _create.afterClosed().subscribe(r => {
      this.loadUser();
    });
  }

  bookDesk(id: any) {
    const _create = this.dialog.open(FloorComponent, {
      width: '400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _create.afterClosed().subscribe(response => {
      this.loadDesk();
    });
  }

  loadDesk() {
    this.service.getAllDesks().subscribe(response => {
      this.deskData = response;
      console.log('loaded');
      this.finalDeskData = new MatTableDataSource<officeModel>(this.deskData);
      this.finalDeskData.paginator = this._paginator;
      this.finalDeskData.sort = this._sort;
    });
  }

  loadUser() {
    this.service.getAllUsers().subscribe(response => {
      this.userData = response;
      console.log('loaded');
      this.finalUserData = new MatTableDataSource<userModel>(this.userData);
      this.finalUserDataTable = this.finalUserData['filteredData']
      this.finalUserData.paginator = this._paginator;
      this.finalUserData.sort = this._sort
    });
  }

  editUser(employee_id: any) {
    this.userLogin(employee_id)
  }

  deleteUser(employee_id: any) {
    this.service.removeByEmployeeId(employee_id).subscribe(_response => {
      this.loadUser();
    })
  }

  editDesk(floor_id: any) {
    this.bookDesk(floor_id)
  }

  deleteDesk(floor_id: any) {
    this.service.removeByDeskId(floor_id) .subscribe(_response => {
      this.loadDesk();
    })
  }
}

