import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  ViewChild, ElementRef  } from '@angular/core';
import { Platform, AlertController} from 'ionic-angular';

import { Device } from '@ionic-native/device/ngx';

//import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'Firebase';
import { Geofence } from '@ionic-native/geofence';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailService } from '../../providers/home/email.service';



/**
 * Generated class for the GeofencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-geofence',
  templateUrl: 'geofence.html',
})
export class GeofencePage { @ViewChild('map') mapElement: ElementRef;

map: any;
ref:any ;

data = {radius: 50, transitionType: 3, notificationText:''} ;
watch : any ;
UserId : string ;
latitude : number ;
longitude : number ;
infoWindows = [] ;
UserEmail : string ;
marker_info : string ;
markers = [];
geolocations = [] ;
map2: any ;
marker : any ;
geo = '' ;
geofences : Geofence[] ;
email_client = '' ;




ref2 = firebase.database().ref();

constructor(
  
  public navCtrl: NavController,
   public platform:Platform, 
   private fire: AuthProvider ,
   private afireAuth:AngularFireAuth,
   private geofence: Geofence,
   private geolocation: Geolocation,
   private device: Device,
   public alertCtrl: AlertController,
   private emailService: EmailService
  
   
  ) {

    console.log(geolocation);
    this.UserId = this.afireAuth.auth.currentUser.uid ;
    this.UserEmail = this.afireAuth.auth.currentUser.email ;
    this.ref = firebase.database().ref(this.UserId+'/geolocations/');

    this.infoWindows = [];

  //  this.user = this.UserId ;
    this.email_client = this.UserEmail ;
    this.marker_info = this.UserEmail ;

    this.ref2 = firebase.database().ref('geofences');
//  const query = selectconv.orderByChild('chats') ;

      this.ref2.on('value', resp => {
      this.geofences = [];
      this.geofences = snapshotToArray(resp);

      console.log(this.geofences) ;

    });

  platform.ready().then(() => {
    this.initMap();

    geofence.initialize().then(
      () => console.log('Geofence Plugin Ready'),
      (err) => console.log(err)
    )

    
    geofence.onTransitionReceived().subscribe(resp => {
      
      console.log("geofence on transition recieved", resp);
      this.emailService.sendEmail({email: this.UserEmail, appareil: this.device.uuid, latitude: this.latitude, longitude: this.longitude, lieu: this.data.notificationText, date: Date()});

    });   
  

  });

  this.ref.on('value', resp => {
    // this.deleteMarkers();
    snapshotToArray(resp).forEach(data => {
      if(data.uuid !== this.device.uuid) {
        let image = 'assets/imgs/green-bike.png';
        let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
        this.addMarker(updatelocation,image,this.email_client, Date());
        this.setMapOnAll(this.map);
      } else {
        let image = 'assets/imgs/blue-bike.png';
        let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
        this.addMarker(updatelocation,image, this.email_client, Date());
        this.setMapOnAll(this.map);
      }
    });
  });

  
}



initMap() {

  let options = {timeout: 20000, enableHighAccuracy: true};

  this.geolocation.getCurrentPosition(options).then((resp) => {
    let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
    console.log(mylocation);
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: mylocation
    });

    firebase.database().ref('users/'+this.UserId).set({
    
      email : this.email_client,
      lastConnexion: Date(),
      uuid: this.device.uuid,
      latitude: resp.coords.latitude,
      longitude : resp.coords.longitude,
      userId : this.UserId
      
    });
    let image = 'assets/imgs/blue-bike.png';
    this.addMarker(mylocation,image, this.email_client, Date());

    


  });
     
  
  
  this.watch = this.geolocation.watchPosition();
  this.watch.subscribe((data) => {

  //  console.log(data) ;
    
    this.longitude = data.coords.longitude ;
    this.latitude = data.coords.latitude ;
    this.deleteMarkers();
  //  this.updateGeolocation(this.device.uuid, data.coords.latitude,data.coords.longitude, this.date, this.user, this.email_client );
    let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
    let image = 'assets/imgs/blue-bike.png';
    this.addMarker(updatelocation,image, this.email_client, Date());
    this.setMapOnAll(this.map);

  });   

}




addMarker(location, image, marker_info, marker_date) {

  let marker = new google.maps.Marker({
    position: location,
    map: this.map,
    icon: image
  });


  var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading"></h1>'+
    '<div id="bodyContent">'+
    '<p>'+marker_info+'</p>'+ '<p>'+marker_date+'</p>'
    '</div>'+
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });


  marker.addListener('click', function() {
    infowindow.open(this.map, marker);
  });

/*  // Add circle overlay and bind to marker
  var circle = new google.maps.Circle({
    strokeColor: '#FF8a00',
    strokeOpacity: 0.1,
    strokeWeight: 1,
    fillColor: '#006ba8',
    fillOpacity: 0.1,
    map: this.map,
  //  center: citymap[city].center,
    radius: this.data.radius
  });

  circle.bindTo('center', marker, 'position');  */

  this.markers.push(marker);

  return marker ;

}

setMapOnAll(map) {
  for (var i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(map);
  }
}

clearMarkers() {
  this.setMapOnAll(null);
}

deleteMarkers() {
  this.clearMarkers();
  this.markers = [];
}


addGeofence(){

  this.emailService.sendEmail2({email: this.UserEmail, appareil: this.device.uuid, latitude: this.latitude, longitude: this.longitude, lieu: this.data.notificationText, date: Date()});
 
  this.ref = firebase.database().ref('geofences') ;

  let newData = this.ref.push();

  newData.set({
    
    id : newData.key+'|'+this.UserEmail+'|'+this.data.notificationText+'|'+this.device.uuid,
    date: Date(),
    uuid: this.device.uuid, 
    latitude:       this.latitude, 
    longitude:      this.longitude,
    radius: this.data.radius ,
    transition:  3 , 
    userId : this.UserId,
    userEmail: this.UserEmail,
    notification_id: 123,
    notification_title: this.UserEmail,
    notification_text: this.data.notificationText,
    openAppOnClick: true
    
  });
  



  let fence = {
    id: newData.key+'|'+this.UserEmail+'|'+this.data.notificationText+'|'+this.device.uuid, //any unique ID
    latitude:       this.latitude, //center of data radius
    longitude:      this.longitude,
    radius:         this.data.radius , //radius to edge of data in meters
    transitionType: 3, //see 'Transition Types' below
    notification: { //notification settings
      //  id:             newData.key, 
        title:          'Géoréperage '+this.UserEmail, //notification title
        text:           'Vous êtes proche de '+this.data.notificationText, //notification body
        openAppOnClick: true //open app when notification is tapped
    }
  }

 // this.geofence.removeAll() ;

  this.geofence.addOrUpdate(fence).then(
     () => {
       
      console.log('Geofence added '+fence.transitionType);
      this.navCtrl.pop() ;

    },
      
     (err) => console.log('Geofence failed to add')
   );

   this.geofence.getWatched().then((res)=>{

      console.log(res);
  }) ;


}


}


export const snapshotToArray = snapshot => {
let returnArr = [];

snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
});

return returnArr;
};

