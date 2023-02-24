import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorComponent } from './features/floor/floor/floor.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login/login.component';
import { AuthGuard } from './shared/services/shared/auth.guard';


const routes: Routes = [ 
  {path: '', component: HomeComponent},
  {path: 'nav', component: HomeComponent,},
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate:[AuthGuard]},
  {path: 'floor', component: FloorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
