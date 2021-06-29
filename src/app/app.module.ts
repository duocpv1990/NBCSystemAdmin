import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  ciAuthInterceptorProvider,
  CiAuthModule
} from '@consult-indochina/auth';
import { CiCommonModule } from '@consult-indochina/common';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { APIInterceptor } from './utils/interceptors/api.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    CiCommonModule.forRoot({
      S3_URL:
        'https://fgehlb1to6.execute-api.ap-southeast-1.amazonaws.com/prod/presigned-url',
    }),
    CiAuthModule.forRoot({
      // API_URL: 'https://nbcapi.chuyendoisodn.com/api',
      API_URL: 'http://192.168.1.34/nbc/api',
      PermissionNames: [],
      uiOption: 'custom',
    }),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'vi-vi' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    ciAuthInterceptorProvider,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
