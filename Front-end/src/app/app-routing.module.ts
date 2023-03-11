import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorComponent } from './features/floor/floor.component';
import { HomeComponent } from './features/home/home.component';
import { RegistrationComponent } from './features/registration/registration.component';
import { NavComponent } from './features/nav/nav.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }, 
  { path: 'nav', component: NavComponent },
  { path: 'home', component: HomeComponent, },
  { path: 'registration', component: RegistrationComponent, },
  { path: 'floor', component: FloorComponent },
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
