import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { UserService } from 'src/app/shared/services/user.service';
import { officeModel } from 'src/app/shared/models/officeModel';
import { FloorComponent } from '../floor/floor/floor.component';
import { MatTableDataSource } from '@angular/material/table';


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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'SARAO Hotdesking';
  finalUserData: any; 
  officeModel: any;
  

  displayedColumns: string[] = ["floor_id", "floor_name", "building_name", "office_name", "desk_id","capacity", "occupied", "action"];

  constructor(private service: UserService,private dialog: MatDialog) {}

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  userData!: officeModel[];

  ngOnInit() {
    this.loadDesk();
  }
  
  bookDesk(floor_id: any) {
    const _create = this.dialog.open(FloorComponent, {
      width: '400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        floor_id: floor_id
      }
    })
    _create.afterClosed().subscribe(r => {
    });
  }

  loadDesk() {
    this.service.getAllUsers().subscribe(response => {
    this.userData = response;
    this.finalUserData =new MatTableDataSource<officeModel>(this.userData);
    this.finalUserData.paginator = this._paginator;
    this.finalUserData.sort = this._sort;
    console.log("Desk Values",this.userData);
    });
  }

  editOffice(floor_id: any) {
    this.bookDesk(floor_id);
  }

  deleteOffice(floor_id: any) {
   this.service.removeById(floor_id).subscribe(reponse =>{
    this.loadDesk();
   })
  }
}

