import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { CampoControlErrorModule } from './components/campo-control-error/campo-control-error.module';
import { ModalAlertModule } from './components/modal-alert/modal-alert.module';
import { RegisterModule } from './pages/register/register.module';
import { RegisterService } from './services/register.service';
import { HomeModule } from './pages/home/home.module';
import { InterceptorModule } from './interceptors/interceptor.module';
import { ModalTractorModule } from './components/modal-tractor/modal-tractor.module';
import { PushSubscriptionService } from './services/pushSubscription.service';
import { HeaderModule } from './components/header/header.module';
import { environment } from '../environments/environment';

import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { TractorService } from './services/tractor.service';
import { MyTractorsModule } from './pages/myTractors/myTractors.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    RegisterModule,
    ModalAlertModule,
    HttpClientModule,
    InterceptorModule,
    HeaderModule,
    CampoControlErrorModule,
    HomeModule,
    MyTractorsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    AuthService,
    StorageService,
    RegisterService,
    TractorService,
    PushSubscriptionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
