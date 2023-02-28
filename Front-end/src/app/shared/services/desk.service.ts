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

  url = "http://localhost:3000/floors";

  url2 =  "http://localhost:3000/users";

  getAllUsers(): Observable<userModel[]>{
    return this.http.get<userModel[]>(this.url2);
  }

  getAllDesks(): Observable<FloorModel[]>{
    return this.http.get<FloorModel[]>(this.url);
  }

  getByEmployeeId(id: any):Observable<userModel[]>{
    return this.http.get<userModel[]>(this.url2 + '/' + id);
  }

  getByDeskId(id: any):Observable<FloorModel[]>{
    return this.http.get<FloorModel[]>(this.url + '/' + id);
  }

  removeByEmployeeId(id: any) {
    return this.http.delete(this.url2 + '/' + id);
  } 

  removeByDeskId(id: any) {
    return this.http.delete(this.url + '/' + id);
  } 

  updateByEmployeeId(id: any, user: any) {
    return this.http.put(this.url2 + '/' + id, user);
  }

  updateByDeskId(id: any, floor: any) {
    return this.http.put(this.url + '/' + id, floor);
  }

  saveUserData(user: any) {
    console.log(user);
    return this.http.post(this.url2, user)
  }

  saveDeskData(floor: any) {
    console.log(floor)
    return this.http.post(this.url, floor)
  }
}