import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import * as firebase from 'Firebase';
import { EmailService } from '../../providers/home/email.service';
import { Device } from '@ionic-native/device/ngx';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */





declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})



export class MapPage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  map2: any ;
  markers = [];
  UserId : string ;
  UserEmail : string ;
  date = Date() ;
  infoWindows: any;
  marker : any ;
  latitude : number ;
  longitude : number ;
  user = '' ;
  marker_info = '' ;
  users : User[] ;

  email_client = '' ;

  geolocations = [] ;
  geofences = [] ;

  watch : any ;
  

  ref = firebase.database().ref();
  ref2 = firebase.database().ref();


  constructor(public navCtrl: NavController,
    public platform: Platform, private fire: AuthProvider ,
    private email: EmailService,
    private geolocation: Geolocation,
    private device: Device) {

      console.log(geolocation);
      this.UserId = fire.getUserId() ;
      this.UserEmail = fire.getEmail() ;
      this.ref = firebase.database().ref(this.UserId+'/geolocations/');

      this.infoWindows = [];

      this.user = this.UserId ;
      this.email_client = this.UserEmail ;
      this.marker_info = this.UserEmail ;

      this.ref2 = firebase.database().ref('users');
  //  const query = selectconv.orderByChild('chats') ;

        this.ref2.on('value', resp => {
        this.users = [];
        this.users = snapshotToArray(resp);

        console.log(this.users) ;

      });

    platform.ready().then(() => {
      this.initMap();

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

  portChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
      console.log(event.value);
    
      let updatelocation = new google.maps.LatLng(event.value.latitude,event.value.longitude);

      let image = 'assets/imgs/blue-bike.png';

       let marker = this.addMarker(updatelocation, image, event.value.email, event.value.lastConnexion) ;

       this.setMapOnAll(this.map);

      var latLng = marker.getPosition(); // returns LatLng object

      console.log(marker) ;


      this.map.setCenter(latLng); // setCenter takes a LatLng object

      

  }

  initMap() {

    let options = {timeout: 20000, enableHighAccuracy: true};

    this.geolocation.getCurrentPosition(options).then((resp) => {

      this.latitude = resp.coords.latitude ;
      this.longitude = resp.coords.longitude ;

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

  updateGeolocation(uuid, lat, lng, date, id_client, email_client) {

    
    let reference = firebase.database().ref('geofences') ;

      reference.on('value', resp => {
     
      snapshotToArray(resp).forEach(data => {

         this.geofences = snapshotToArray(resp);

        console.log(this.geofences) ;

      });

    });

    this.geofences.forEach(element => {


      if (Number((element.latitude).toFixed(3)) === Number((lat).toFixed(3)) && Number((element.longitude).toFixed(3)) === Number((lng).toFixed(3)) ) {

        let data = {email: email_client, appareil:uuid, latitude: lat, longitude:lng, lieu: element.notification_text} ;

        this.email.sendEmail(data) ;

        
      }
      
    });
  

    firebase.database().ref('users/'+id_client).set({
      
      email : email_client,
      lastConnexion: Date(),
      uuid: uuid,
      latitude: lat,
      longitude : lng,
      userId : id_client
      
    });

    if(localStorage.getItem('mykey')) {
      firebase.database().ref(id_client+'/geolocations/'+localStorage.getItem('mykey')).set({
        uuid: uuid,
        latitude: lat,
        longitude : lng,
        date: Date(),
        email : this.email_client,
      });
    } else {
      
      this.ref =  firebase.database().ref(id_client+'/geolocations') ;

      let newData = this.ref.push();
      newData.set({
        uuid: uuid,
        latitude: lat,
        longitude: lng,
        date: Date(),
        email: this.email_client
      });
      localStorage.setItem('mykey', newData.key);
    }
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