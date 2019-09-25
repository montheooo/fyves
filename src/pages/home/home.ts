import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Nav } from 'ionic-angular';
import { EmailService } from '../../providers/home/email.service';
import { CallService } from '../../providers/home/call.service';
import { MapsService } from '../../providers/home/maps.service';
import { InAppBrowserService } from '../../providers/home/in-app-browser.service';
import { data } from './home-data';
import { Tile } from './models/tile.model';
import { GeofencePage } from '../geofence/geofence';
import { MapPage } from '../map/map';
import { BuddiesPage } from '../buddies/buddies';

import * as firebase from 'Firebase';
import { FCM } from '@ionic-native/fcm';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private emailService: EmailService;
	private callService: CallService;
	private mapsService: MapsService;
	private browserService: InAppBrowserService;
	private nav: Nav;
	
//	private ref = firebase.database().ref();
//	private Geofences = [] ;
//	private email : string 
  public tiles: Tile[][];


  constructor(public platform: Platform,
		callService: CallService,
		mapsService: MapsService,
		browserService: InAppBrowserService,
		nav: Nav,
		private fcm: FCM
) {
  }

  ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');
		this.fcm.subscribeToTopic('marketing');

      this.fcm.getToken().then(token => {
        // backend.registerToken(token);
        console.log(token) ;
        this.addToken(token) ;
        
      });

      this.fcm.onNotification().subscribe(data => {
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        // backend.registerToken(token);
          this.addToken(token) ;
      });

  }

  private initTiles(): void {
		this.tiles = [[{
			title: 'Géo-répérage',
			path: 'map',
			icon: 'md-pin',
			component: GeofencePage
		}, {
			title: 'Chat List',
			path: 'chats',
			icon: 'swap',
			component: BuddiesPage
		}], [{
			title: 'Map',
			path: 'map',
			icon: 'map',
			component: MapPage
		}]];
  }
  
  public navigateTo(tile) {
		this.nav.setRoot(tile.component);
	}

	public getDirections() {
		this.mapsService.openMapsApp(data.officeLocation);
	}

	public sendEmail() {

		// this.submit();
		// this.emailService.sendEmail(data.email);
	}

	public openFacebookPage() {
		this.browserService.open(data.facebook);
	}

	public callUs() {
		this.callService.call(data.phoneNumber);
	}

	addToken(token){
    var promise = new Promise((resolve, reject)=> {
      let dbref = firebase.database().ref('/users') ;
        dbref.child(firebase.auth().currentUser.uid + '/notificationTokens/').set({
          notificationToken: token 
        })
        .then(()=>{
          resolve(true);
        }).catch((err)=>{
          reject(err);
        })
    })
    return promise;
}

}
