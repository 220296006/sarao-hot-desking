import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { AngularMaterialModule } from './features/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './features/user/user/user.component';
import { DeskComponent } from './features/desk/desk/desk.component';
import { FloorComponent } from './features/floor/floor/floor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BarComponent } from './logRocket/bar/bar.component';
import { PieComponent } from './logRocket/pie/pie.component';
import { ScatterComponent } from './logRocket/pie/scatter/scatter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NavComponent } from './features/nav/nav/nav.component';
import { DateTimePickerModule, MaskedDateTimeService } from '@syncfusion/ej2-angular-calendars';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    DeskComponent,
    FloorComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    NavComponent
  ],

  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}, MaskedDateTimeService],
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
    DateTimePickerModule
  ],
})
export class AppModule { }
