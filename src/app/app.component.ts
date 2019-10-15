import { Component, ViewChild, Injectable } from '@angular/core';
import { Platform, MenuController, Nav, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { GeofencePage } from '../pages/geofence/geofence';


import { ChatsPage } from '../pages/chats/chats';
import { FCM } from '@ionic-native/fcm';
import * as firebase from 'Firebase';
import { AllUsersPage } from '../pages/all-users/all-users';
import { UserInfo } from 'Firebase';
import { UserProvider } from '../providers/user/user';

@Injectable()
@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {

  rootPage:any = 'LoginPage';
  pages;
  role:any;
  show =new Array();
  test = 'man';

  private statusBar;
	private platform;
  private splashScreen;
  private menu: MenuController;
  

  

   @ViewChild(Nav) nav: Nav; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, menu: MenuController, public userservice: UserProvider,public events: Events
 
   ) {
     
    this.splashScreen = splashScreen;
		this.statusBar = statusBar;
    this.platform = platform;
    this.menu = menu;


    console.log('le menu est charge');

    events.subscribe('test', (role, time) => {
      // user role and time are the same arguments passed in `events.publish(role, time)`
      console.log('Welcome', role, 'at', time);
      this.role=role;
    });
    
    this.pages = [
			{ title: 'Home', component: HomePage, icon: 'home', see: this.show[0] },
      { title: 'Géolocalisation', component: MapPage, icon: 'map', see: this.show[1] },
      { title: 'Géo-Réperage', component: GeofencePage, icon: 'md-pin',  see: this.show[2] },
      { title: 'Chat Message', component: ChatsPage, icon: 'swap', see: this.show[3] },
    ];
    
    
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();


    }); // End platform ready !

  }  // End Constructor

  ionViewDidLoad() {
   
    
  }


 
  openPage(page) {
    this.menu.close();
    this.nav.push(page.component);
  }

  openPageManage() {
    this.menu.close();
    this.nav.push(AllUsersPage);
  }
  
  openPageHomePage(){
    this.menu.close();
    this.nav.push(HomePage);
  };

  openPageMapPage(){
    this.menu.close();
    this.nav.push(MapPage);
  };

  openPageGeofencePage(){
    this.menu.close();
    this.nav.push(GeofencePage);
  };

  openPageChatsPage(){
    this.menu.close();
    this.nav.push(ChatsPage);
  };

/* getrole(){ this.userservice.getuserdetails().then((value:UserInfo)=>{
  console.log(value.role);
  return value.role ;
});}*/



}  // End Class

