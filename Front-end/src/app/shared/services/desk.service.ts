import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userModel } from '../models/userModel';
import {FloorModel} from '../models/floorModel';

@Injectable({
  providedIn: 'root'
})
export class DeskService {

  constructor(private http: HttpClient) { }

  url_Floors = "http://127.0.0.1:8000/api/floors";

  url_Users = "http://127.0.0.1:8000/api/users";

  getAllUsers(): Observable<userModel[]>{
    return this.http.get<userModel[]>(this.url_Users);
  }

  getAllDesks(): Observable<FloorModel[]>{
    return this.http.get<FloorModel[]>(this.url_Floors);
  }

  getByEmployeeId(id: any): Observable<userModel[]>{
    return this.http.get<userModel[]>(`${this.url_Users}/${id}`);
  }

  getByDeskId(id: any): Observable<FloorModel[]>{
    return this.http.get<FloorModel[]>(`${this.url_Floors}/${id}`);
  }

  removeByEmployeeId(id: any) {
    return this.http.delete(`${this.url_Users}/${id}`);
  } 

  removeByDeskId(id: any) {
    return this.http.delete(`${this.url_Floors}/${id}`);
  } 

  updateByEmployeeId(id: any, data: any) {
    return this.http.put(`${this.url_Users}/${id}`, data);
  }

  updateByDeskId(id: any, data: any){
    return this.http.put(`${this.url_Floors}/${id}`, data);
  }

  saveUserData(user: any) {
    console.log(user);
    return this.http.post(this.url_Users, user);
  }

  saveDeskData(floor: any) {
    console.log(floor)
    return this.http.post(this.url_Floors, floor);
  }

  isloggedin(){
    return sessionStorage.getItem('firstName')!=null;
  }

  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  
  Getaccessbyrole(role:any,menu:any){
    return this.http.get(`http://127.0.0.1:8000/roleaccess?role=${role}&menu=${menu}`);
  }
}
