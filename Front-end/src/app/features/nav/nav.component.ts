import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
title = 'Sarao Hotdesking'

constructor(){}

ngOnInit(): void {
}

isLoggedIn(){
  return localStorage.getItem('token')
}
onLogout(){
   localStorage.removeItem('token')
}
}
