import { Component } from '@angular/core';
import LogRocket from 'logrocket';
LogRocket.init('hfebmb/sarao-hotdesking');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SARAO Hotdesking';
}

LogRocket.identify('Thabiso Matsaba',{
  name: 'Thabiso Matsaba',
  email:'Thabisomatsaba96@gmail.com',

  subscriptionType: 'free'
});

