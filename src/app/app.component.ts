import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { GeofencePage } from '../pages/geofence/geofence';
import { initializeApp } from 'firebase';
import { BuddiesPage } from '../pages/buddies/buddies';
import { ChatsPage } from '../pages/chats/chats';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = 'LoginPage';
  pages;

  private statusBar;
	private platform;
  private splashScreen;
  private menu: MenuController;

   @ViewChild(Nav) nav: Nav; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, menu: MenuController
   ) {

    this.splashScreen = splashScreen;
		this.statusBar = statusBar;
    this.platform = platform;
    this.menu = menu;

    this.pages = [
			{ title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Géolocalisation', component: MapPage, icon: 'map' },
      { title: 'Géo-Réperage', component: GeofencePage, icon: 'md-pin' },
      { title: 'Chat Message', component: ChatsPage, icon: 'swap' },
    ];
    
    this.initializeApp();


  }  // End Constructor


  initializeApp(){
      
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    }); // End platform ready !

  } // End initialize

  openPage(page) {
    this.menu.close();
    this.nav.push(page.component);
  }


}  // End Class

