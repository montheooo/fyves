import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';


import { MyApp } from './app.component';
import { config } from './app.angularfireconfig';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ImagehandlerProvider } from '../providers/imagehandler/imagehandler';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { Crop } from '@ionic-native/crop';
import { GeofencePageModule } from '../pages/geofence/geofence.module';
import { EmailService } from '../providers/home/email.service';
import { MapsService } from '../providers/home/maps.service';
import { CallService } from '../providers/home/call.service';
import { InAppBrowserService } from '../providers/home/in-app-browser.service';
import { BuddiesPageModule } from '../pages/buddies/buddies.module';
import { ChatsPageModule } from '../pages/chats/chats.module';

import { FCM } from '@ionic-native/fcm';
import { TokenProvider } from '../providers/chat/token';
import { AllUsersPageModule } from '../pages/all-users/all-users.module';



@NgModule({
  declarations: [
   MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsPlacement : 'top'}),
    GeofencePageModule,
    BuddiesPageModule,
    ChatsPageModule,
    AllUsersPageModule,
    AngularFireModule.initializeApp(config),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  
  ],
  providers: [
    MyApp,
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    File,
    Crop,
    FilePath,
    FileChooser,
    ImagehandlerProvider,
    RequestsProvider,
    ChatProvider,
    ChatProvider,
    EmailService,
    MapsService,
    CallService,
    InAppBrowserService,
    FCM,
    TokenProvider
    
  ]
})
export class AppModule {}
