import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorComponent } from './features/floor/floor/floor.component';
import { HomeComponent } from './features/home/home.component';
import { UserComponent } from './features/user/user/user.component';


const routes: Routes = [ 
  {path: '', component: HomeComponent},
  {path: 'nav', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'user', component: UserComponent},
  {path: 'floor', component: FloorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
