import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { AngularMaterialModule } from './features/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FloorComponent } from './features/floor/floor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NavComponent } from './features/nav/nav.component';
import { DateTimePickerModule} from '@syncfusion/ej2-angular-calendars';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { RegistrationComponent } from './features/registration/registration.component';
import { LogoutComponent } from './features/logout/logout.component';
import { AuthService } from './shared/services/auth.service';
import { ToastrModule} from 'ngx-toastr'
import { AuthGuard } from './shared/services/auth.guard';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from './features/login/login.component';
import { TokenInterceptorService } from  './shared/services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FloorComponent,
    NavComponent, 
    RegistrationComponent, 
    LogoutComponent, 
    LoginComponent
  ],

  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    AuthService, AuthGuard, ToastrService, TokenInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],

  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DateTimePickerModule,
    MatIconModule,
    FontAwesomeModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
})
export class AppModule { }
