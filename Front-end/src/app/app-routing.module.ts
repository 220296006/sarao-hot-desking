import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorComponent } from './features/floor/floor.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { NavComponent } from './features/nav/nav.component';
import { AuthGuard } from './shared/guard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nav', component: NavComponent },
  { path: 'home', component: HomeComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'floor', component: FloorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
