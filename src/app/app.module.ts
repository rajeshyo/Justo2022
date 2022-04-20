import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule  } from '@angular/common/http';
import {SignupService} from '../app/services/signup.service'
import {HomeService} from '../app/services/home.service'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { VerificationPipe } from './verification.pipe';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service'; // Here is the import line

// geolocation and native-geocoder
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { IonMediaCacheModule } from 'ion-media-cache';

import { AppUpdate } from '@ionic-native/app-update/ngx';
import { Downloader  } from '@ionic-native/downloader/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from '@ionic-native/market/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
// import { EmailComposer } from '@ionic-native/email-composer';
@NgModule({
  declarations: [AppComponent, VerificationPipe,],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LazyLoadImageModule,
    IonMediaCacheModule,
    
  ],
  providers: [
    // EmailComposer,
    Camera,
    File,
    FirebaseX,
    StatusBar,
    SignupService,
    HomeService,
    SplashScreen,
    AuthGuard,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    NativeGeocoder,
    Diagnostic,
    AuthService,
    File,
  
    AppUpdate,
    Downloader,
    AppVersion,
    Market,
   
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
}) 
export class AppModule {}
