import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: any) {
   let userArray = [];
   if(localStorage.getItem('users')){
    userArray = JSON.parse(localStorage.getItem('users') as string);
   }
   return userArray.find(((p: { employeeId: any; firstName: 
    any; lastName: any; email: any; phoneNumber: any; position: any; 
    password: any; passwordConfirmation: any }) => p.employeeId === user.employeeId 
    && p.firstName === user.firstName && p.lastName === user.lastName
    && p.email === user.email && p.phoneNumber === user.phoneNumber 
    && p.password === user.password
    && p.passwordConfirmation === user.passwordConfirmation)) ;
  }
}
