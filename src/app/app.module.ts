import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./components/shared/shared.module";
import { HomeComponent } from './components/home/home.component';
import {MatButtonModule} from "@angular/material/button";
import {TasksModule} from "./components/tasks/tasks.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RequestInterceptor} from "./interceptors/request.interceptor";
import localeEsAR from '@angular/common/locales/es-AR';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from "@angular/forms";
registerLocaleData(localeEsAR, 'es-AR');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    TasksModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: localeEsAR, useValue: 'es-AR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
