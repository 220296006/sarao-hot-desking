import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userModel } from '../models/userModel';
import {officeModel} from "C:/Users/thabi/Desktop/Python/sarao-hot-desking/Front-end/src/app/shared/models/officeModel";


@Injectable({
  providedIn: 'root'
})
export class DeskService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/floors";

  url2 =  "http://localhost:3000/users";

  getAllUsers(): Observable<userModel[]>{
    return this.http.get<userModel[]>(this.url2);
  }

  getAllDesks(): Observable<officeModel[]>{
    return this.http.get<officeModel[]>(this.url);
  }

  getByEmployeeId(employee_id: any):Observable<userModel[]>{
    return this.http.get<userModel[]>(this.url2 + '/' + employee_id);
  }

  getByDeskId(floor_id: any):Observable<officeModel[]>{
    return this.http.get<officeModel[]>(this.url + '/' + floor_id);
  }

  removeByEmployeeId(employee_id: any) {
    return this.http.delete(this.url2 + '/' + employee_id);
  } 

  removeByDeskId(floor_id: any) {
    return this.http.delete(this.url + '/' + floor_id);
  } 

  updateByEmployeeId(employee_id: any, user: any) {
    return this.http.put(this.url2 + '/' + employee_id, user);
  }

  updateByDeskId(floor_id: any, floor: any) {
    return this.http.put(this.url + '/' + floor_id, floor);
  }

  saveUserData(employee_id: Partial<{ employee_id: number | null; employee_name: string | null; position: string |null; bookingDate: Date | null;}>) {
    return this.http.post(this.url2, employee_id)
  }

  saveDeskData(floor_id: Partial<{ employee_id: number | null; floor_id: number | null; floor_name: string | null; building_name: string | null; office_name: string | null; capacity: number | null; desk_id: number | null;}>) {
    return this.http.post(this.url, floor_id)
  }
}