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

  getByDeskId(employee_id: any):Observable<officeModel[]>{
    return this.http.get<officeModel[]>(this.url + '/' + employee_id);
  }

  removeByEmployeeId(employee_id: any) {
    return this.http.delete(this.url2 + '/' + employee_id);
  } 

  removeByDeskId(employee_id: any) {
    return this.http.delete(this.url + '/' + employee_id);
  } 

  updateByEmployeeId(employee_id: any, user: any) {
    return this.http.put(this.url2 + '/' + employee_id, user);
  }

  updateByDeskId(employee_id: any, floor: any) {
    return this.http.put(this.url + '/' + employee_id, floor);
  }

  saveUserData(user: any) {
    return this.http.post(this.url2, user)
  }

  saveDeskData(desk: any) {
    return this.http.post(this.url, desk)
  }
}