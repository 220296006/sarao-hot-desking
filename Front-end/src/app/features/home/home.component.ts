import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { officeModel } from "C:/Users/thabi/Desktop/Python/sarao-hot-desking/Front-end/src/app/shared/models/officeModel";
import { UserService } from "C:/Users/thabi/Desktop/Python/sarao-hot-desking/Front-end/src/app/shared/services/user.service";
import { FloorComponent } from '../floor/floor/floor.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'SARAO Hotdesking';
  finalUserData: any;
  offices: any;
  floors: any;
  desks: any;


  displayedColumns: string[] = ["floor_id", "floor_name", "building_name", "office_name", "desk_id", "occupied", "action"];



  constructor(private service: UserService, private dialog: MatDialog) {}
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  userData!: officeModel[];

  ngOnInit(): void {
    this.loadOffice();
  }

  addOffice(id: any) {
    const _create = this.dialog.open(FloorComponent, {
      width: '400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        floor_id: id
      }
    })
    _create.afterClosed().subscribe(r => {
      this.loadOffice();
    });
  }

  loadOffice() {
    this.service.getAllUsers().subscribe(response => {
      this.userData = response;
      this.finalUserData = new MatTableDataSource<officeModel>(this.userData)
      this.finalUserData.paginator = this._paginator;
      this.finalUserData.sort = this._sort;
    })
  }

  editOffice(id: any) {
    this.addOffice(id);
  }

  deleteOffice(id: any) {
    this.service.removeById(id).subscribe(response => {
      this.loadOffice();
    });
  }
}

