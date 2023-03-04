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

  url = "http://127.0.0.1:8000/api/floors";

  url2 = "http://127.0.0.1:8000/api/users";

  getAllUsers(): Observable<userModel[]>{
    return this.http.get<userModel[]>(this.url);
  }

  getAllDesks(): Observable<FloorModel[]>{
    return this.http.get<FloorModel[]>('/api/floors');
  }

  getByEmployeeId(id: any):Observable<userModel[]>{
    return this.http.get<userModel[]>(this.url2 + '/' + id);
  }

  getByDeskId(id: any):Observable<FloorModel[]>{
    return this.http.get<FloorModel[]>('/api/floors' + '/' + id);
  }

  removeByEmployeeId(id: any) {
    return this.http.delete(this.url2+ '/' + id);
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