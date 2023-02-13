import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {officeModel} from "C:/Users/thabi/Desktop/Python/sarao-hot-desking/Front-end/src/app/shared/models/officeModel";


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/floors";

  getAllUsers(): Observable<officeModel[]>{
    return this.http.get<officeModel[]>(this.url);
  }

  getById(floor_id: any):Observable<officeModel[]>{
    return this.http.get<officeModel[]>(this.url + '/' + floor_id);
  }

  removeById(floor_id: any) {
    return this.http.delete(this.url + '/' + floor_id);
  } 

  updateById(floor_id: any, desk: any) {
    return this.http.put(this.url + '/' + floor_id, desk);
  }

  saveUserData(floor_id: any) {
    console.log(floor_id)
    return this.http.post(this.url, floor_id)
  }
}