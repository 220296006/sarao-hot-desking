import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog,  MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { DeskService } from 'src/app/shared/services/desk.service';
import { MatTable } from '@angular/material/table';
import { FloorModel } from 'src/app/shared/models/floorModel';
import { FloorComponent } from '../floor/floor/floor.component';


const tableDataSource: FloorModel[] = [
  {
    "id": 1,
    "employee_id": "EMP2023-1",
    "building_name": "SARAO Black River Park",
    "floor_name": "First Floor",
    "bookingDate": '20-0o2-2023, 08:0o0',
    "offices": {
      "office_name": "Software Department Office",
      "capacity": 4,
      "desks": {
        "desk_id": "Desk A",
        "occupied": true
      }
    }
  }
]
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'SARAO Hotdesking';
  tableDataSource: any;
  displayedColumns: string[] = ["employee_id", "floor_name", "building_name", "office_name", "desk_id", "bookingDate", "capacity", "occupied", "action"]
  dataSource = [...tableDataSource]
  @Input() floors: FloorModel[] = [];


  constructor(private service: DeskService, private dialog: MatDialog) {  this.loadDesk();}

  @ViewChild(MatTable) table?: MatTable<FloorModel>
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  ngOnInit(): void {
    this.loadDesk();
  }

  bookDesk(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const _create = this.dialog.open(FloorComponent, {
      width: '400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    } )
    _create.afterClosed().subscribe(response => {
      this.loadDesk();
    });
  }

  loadDesk() {
    this.service.getAllDesks().subscribe(response => {
      this.tableDataSource = response;
      console.log('Loaded');
      this.tableDataSource = new MatTableDataSource<FloorModel>(this.tableDataSource);
      this.tableDataSource._paginator = this._paginator;
      this.tableDataSource._sort = this._sort;
    });
  }

  updateDesk(id: any){
      this.bookDesk(id)
 
  }
  deleteDesk(id: any) {
    this.service.removeByDeskId(id).subscribe(response => {
      this.loadDesk();
    })
  }
}
