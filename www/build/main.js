webpackJsonp([9],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(96);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthProvider = /** @class */ (function () {
    function AuthProvider(afAuth) {
        var _this = this;
        this.afAuth = afAuth;
        afAuth.authState.subscribe(function (user) {
            _this.user = user;
            //	this.fcm2 = fcm ;
        });
    }
    AuthProvider.prototype.login = function (credentials) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
                .then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    AuthProvider.prototype.signInWithEmail = function (credentials) {
        console.log('Sign in with email');
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    };
    AuthProvider.prototype.signUp = function (credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    };
    Object.defineProperty(AuthProvider.prototype, "authenticated", {
        get: function () {
            return this.user !== null;
        },
        enumerable: true,
        configurable: true
    });
    AuthProvider.prototype.getEmail = function () {
        return this.user && this.user.email;
    };
    AuthProvider.prototype.getUserId = function () {
        return this.user.uid;
    };
    AuthProvider.prototype.getName = function () {
        return this.user.displayName;
    };
    AuthProvider.prototype.signOut = function () {
        return this.afAuth.auth.signOut();
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ChatProvider = /** @class */ (function () {
    function ChatProvider(events) {
        this.events = events;
        this.firebuddychats = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/buddychats');
        this.firebuddymessagecounter = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/buddychats');
        this.fireuserStatus = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/userstatus');
        this.buddymessages = [];
        this.msgcount = 0;
        console.log('Hello ChatProvider Provider');
    }
    ChatProvider.prototype.initializebuddy = function (buddy) {
        this.buddy = buddy;
    };
    ChatProvider.prototype.formatAMPM = function (date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };
    ChatProvider.prototype.formatDate = function (date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10)
            dd = '0' + dd;
        if (mm < 10)
            mm = '0' + mm;
        return dd + '/' + mm + '/' + yyyy;
    };
    ChatProvider.prototype.addnewmessage = function (msg) {
        var _this = this;
        var time = this.formatAMPM(new Date());
        var date = this.formatDate(new Date());
        console.log('date>>>', date);
        if (this.buddy) {
            var promise = new Promise(function (resolve, reject) {
                // this.fireuserStatus.child(this.buddy.uid).on('value',(statuss)=>{
                //   let msgstatus = statuss.val();
                _this.firebuddychats.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(_this.buddy.uid).push({
                    sentby: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid,
                    message: msg,
                    timestamp: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database.ServerValue.TIMESTAMP,
                    timeofmsg: time,
                    dateofmsg: date
                    // msgStatus:msgstatus.status
                }).then(function () {
                    _this.firebuddychats.child(_this.buddy.uid).child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).push({
                        sentby: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid,
                        message: msg,
                        timestamp: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database.ServerValue.TIMESTAMP,
                        timeofmsg: time,
                        dateofmsg: date
                        // msgStatus:msgstatus.status
                    }).then(function () {
                        resolve(true);
                    });
                    // .catch((err) => {
                    //   reject(err);
                    // })
                });
            });
            // })
            return promise;
        }
    };
    ChatProvider.prototype.getbuddymessages = function () {
        var _this = this;
        var temp;
        this.firebuddychats.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(this.buddy.uid).on('value', function (snapshot) {
            console.log(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid);
            _this.buddymessages = [];
            temp = snapshot.val();
            console.log('counter Message ', temp);
            for (var tempkey in temp) {
                _this.buddymessages.push(temp[tempkey]);
            }
            _this.events.publish('newmessage');
        });
    };
    ChatProvider.prototype.getbuddyStatus = function () {
        var _this = this;
        var tmpStatus;
        this.fireuserStatus.child(this.buddy.uid).on('value', function (statuss) {
            tmpStatus = statuss.val();
            console.log('tmpStatus=', tmpStatus);
            if (tmpStatus.status == 1) {
                _this.buddyStatus = tmpStatus.data;
            }
            else {
                var date = tmpStatus.timestamp;
                _this.buddyStatus = date;
            }
            _this.events.publish('onlieStatus');
        });
    };
    ChatProvider.prototype.setstatusUser = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.fireuserStatus.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).set({
                status: 1,
                data: 'online',
                timestamp: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database.ServerValue.TIMESTAMP
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    ChatProvider.prototype.setStatusOffline = function () {
        var _this = this;
        var time = this.formatAMPM(new Date());
        var date = this.formatDate(new Date());
        var promise = new Promise(function (resolve, reject) {
            _this.fireuserStatus.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).update({
                status: 0,
                data: 'offline',
                timestamp: date + ' at ' + time
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    ChatProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], ChatProvider);
    return ChatProvider;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RequestsProvider = /** @class */ (function () {
    function RequestsProvider(userservice, events) {
        this.userservice = userservice;
        this.events = events;
        this.firereq = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/requests');
        this.firefriends = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/friends');
        console.log('Hello RequestsProvider Provider');
    }
    RequestsProvider.prototype.sendrequest = function (req) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.firereq.child(req.recipient).push({ sender: req.sender }).then(function () {
                resolve({ success: true });
            });
            // .catch((err) => {
            //   resolve(err);
            // })
        });
        return promise;
    };
    RequestsProvider.prototype.getmyrequests = function () {
        var _this = this;
        var allmyrequests;
        var myrequests = [];
        this.firereq.child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid).on('value', function (snapshot) {
            allmyrequests = snapshot.val();
            myrequests = [];
            for (var i in allmyrequests) {
                myrequests.push(allmyrequests[i].sender);
            }
            _this.userservice.getallusers().then(function (res) {
                var allusers = res;
                _this.userdetails = [];
                for (var j in myrequests)
                    for (var key in allusers) {
                        if (myrequests[j] === allusers[key].uid) {
                            _this.userdetails.push(allusers[key]);
                        }
                    }
                _this.events.publish('gotrequests');
            });
        });
    };
    RequestsProvider.prototype.acceptrequest = function (buddy) {
        var _this = this;
        // var myfriends = [];
        var promise = new Promise(function (resolve, reject) {
            _this.firefriends.child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid).push({
                uid: buddy.uid
            }).then(function () {
                _this.firefriends.child(buddy.uid).push({
                    uid: __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid
                }).then(function () {
                    _this.deleterequest(buddy).then(function () {
                        resolve(true);
                    });
                });
                // .catch((err) => {
                //   reject(err);
                //  })
            });
            // .catch((err) => {
            //   reject(err);
            // })
        });
        return promise;
    };
    RequestsProvider.prototype.deleterequest = function (buddy) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.firereq.child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.uid).once('value', function (snapshot) {
                var somekey;
                for (var key in snapshot.val())
                    somekey = key;
                _this.firereq.child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid).child(somekey).remove().then(function () {
                    resolve(true);
                });
            })
                .then(function () {
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    RequestsProvider.prototype.getmyfriends = function () {
        var _this = this;
        var friendsuid = [];
        this.firefriends.child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid).on('value', function (snapshot) {
            var allfriends = snapshot.val();
            _this.myfriends = [];
            for (var i in allfriends)
                friendsuid.push(allfriends[i].uid);
            _this.userservice.getallusers().then(function (users) {
                _this.myfriends = [];
                for (var j in friendsuid)
                    for (var key in users) {
                        if (friendsuid[j] === users[key].uid) {
                            _this.myfriends.push(users[key]);
                        }
                    }
                _this.events.publish('friends');
            }).catch(function (err) {
                alert(err);
            });
        });
    };
    RequestsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Events */]])
    ], RequestsProvider);
    return RequestsProvider;
}());

//# sourceMappingURL=requests.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeofencePage; });
/* unused harmony export snapshotToArray */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_device_ngx__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Firebase__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geofence__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_home_email_service__ = __webpack_require__(171);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { AuthService } from '../../services/auth.service';






var GeofencePage = /** @class */ (function () {
    function GeofencePage(navCtrl, platform, fire, afireAuth, geofence, geolocation, device, alertCtrl, emailService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.fire = fire;
        this.afireAuth = afireAuth;
        this.geofence = geofence;
        this.geolocation = geolocation;
        this.device = device;
        this.alertCtrl = alertCtrl;
        this.emailService = emailService;
        this.data = { radius: 50, transitionType: 3, notificationText: '' };
        this.infoWindows = [];
        this.markers = [];
        this.geolocations = [];
        this.geo = '';
        this.email_client = '';
        this.ref2 = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref();
        console.log(geolocation);
        this.UserId = this.afireAuth.auth.currentUser.uid;
        this.UserEmail = this.afireAuth.auth.currentUser.email;
        this.ref = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref(this.UserId + '/geolocations/');
        this.infoWindows = [];
        //  this.user = this.UserId ;
        this.email_client = this.UserEmail;
        this.marker_info = this.UserEmail;
        this.ref2 = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref('geofences');
        //  const query = selectconv.orderByChild('chats') ;
        this.ref2.on('value', function (resp) {
            _this.geofences = [];
            _this.geofences = snapshotToArray(resp);
            console.log(_this.geofences);
        });
        platform.ready().then(function () {
            _this.initMap();
            geofence.initialize().then(function () { return console.log('Geofence Plugin Ready'); }, function (err) { return console.log(err); });
            geofence.onTransitionReceived().subscribe(function (resp) {
                console.log("geofence on transition recieved", resp);
                _this.emailService.sendEmail({ email: _this.UserEmail, appareil: _this.device.uuid, latitude: _this.latitude, longitude: _this.longitude, lieu: _this.data.notificationText, date: Date() });
            });
        });
        this.ref.on('value', function (resp) {
            // this.deleteMarkers();
            snapshotToArray(resp).forEach(function (data) {
                if (data.uuid !== _this.device.uuid) {
                    var image = 'assets/imgs/green-bike.png';
                    var updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
                    _this.addMarker(updatelocation, image, _this.email_client, Date());
                    _this.setMapOnAll(_this.map);
                }
                else {
                    var image = 'assets/imgs/blue-bike.png';
                    var updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
                    _this.addMarker(updatelocation, image, _this.email_client, Date());
                    _this.setMapOnAll(_this.map);
                }
            });
        });
    }
    GeofencePage.prototype.initMap = function () {
        var _this = this;
        var options = { timeout: 20000, enableHighAccuracy: true };
        this.geolocation.getCurrentPosition(options).then(function (resp) {
            var mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            console.log(mylocation);
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, {
                zoom: 15,
                center: mylocation
            });
            __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref('users/' + _this.UserId).set({
                email: _this.email_client,
                lastConnexion: Date(),
                uuid: _this.device.uuid,
                latitude: resp.coords.latitude,
                longitude: resp.coords.longitude,
                userId: _this.UserId
            });
            var image = 'assets/imgs/blue-bike.png';
            _this.addMarker(mylocation, image, _this.email_client, Date());
        });
        this.watch = this.geolocation.watchPosition();
        this.watch.subscribe(function (data) {
            //  console.log(data) ;
            _this.longitude = data.coords.longitude;
            _this.latitude = data.coords.latitude;
            _this.deleteMarkers();
            //  this.updateGeolocation(this.device.uuid, data.coords.latitude,data.coords.longitude, this.date, this.user, this.email_client );
            var updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
            var image = 'assets/imgs/blue-bike.png';
            _this.addMarker(updatelocation, image, _this.email_client, Date());
            _this.setMapOnAll(_this.map);
        });
    };
    GeofencePage.prototype.addMarker = function (location, image, marker_info, marker_date) {
        var marker = new google.maps.Marker({
            position: location,
            map: this.map,
            icon: image
        });
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading"></h1>' +
            '<div id="bodyContent">' +
            '<p>' + marker_info + '</p>' + '<p>' + marker_date + '</p>';
        '</div>' +
            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        marker.addListener('click', function () {
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
        return marker;
    };
    GeofencePage.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    };
    GeofencePage.prototype.clearMarkers = function () {
        this.setMapOnAll(null);
    };
    GeofencePage.prototype.deleteMarkers = function () {
        this.clearMarkers();
        this.markers = [];
    };
    GeofencePage.prototype.addGeofence = function () {
        var _this = this;
        this.emailService.sendEmail2({ email: this.UserEmail, appareil: this.device.uuid, latitude: this.latitude, longitude: this.longitude, lieu: this.data.notificationText, date: Date() });
        this.ref = __WEBPACK_IMPORTED_MODULE_4_Firebase__["database"]().ref('geofences');
        var newData = this.ref.push();
        newData.set({
            id: newData.key + '|' + this.UserEmail + '|' + this.data.notificationText + '|' + this.device.uuid,
            date: Date(),
            uuid: this.device.uuid,
            latitude: this.latitude,
            longitude: this.longitude,
            radius: this.data.radius,
            transition: 3,
            userId: this.UserId,
            userEmail: this.UserEmail,
            notification_id: 123,
            notification_title: this.UserEmail,
            notification_text: this.data.notificationText,
            openAppOnClick: true
        });
        var fence = {
            id: newData.key + '|' + this.UserEmail + '|' + this.data.notificationText + '|' + this.device.uuid,
            latitude: this.latitude,
            longitude: this.longitude,
            radius: this.data.radius,
            transitionType: 3,
            notification: {
                //  id:             newData.key, 
                title: 'Géoréperage ' + this.UserEmail,
                text: 'Vous êtes proche de ' + this.data.notificationText,
                openAppOnClick: true //open app when notification is tapped
            }
        };
        // this.geofence.removeAll() ;
        this.geofence.addOrUpdate(fence).then(function () {
            console.log('Geofence added ' + fence.transitionType);
            _this.navCtrl.pop();
        }, function (err) { return console.log('Geofence failed to add'); });
        this.geofence.getWatched().then(function (res) {
            console.log(res);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], GeofencePage.prototype, "mapElement", void 0);
    GeofencePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-geofence',template:/*ion-inline-start:"C:\appp\fyves-sap-final\src\pages\geofence\geofence.html"*/'<!--\n\n  Generated template for the GeofencePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <button ion-button menuToggle >\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n		<ion-title>Fyves SAP</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content> \n\n-->\n\n\n\n<!--\n\n  Generated template for the AddGeofencePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n\n\n      <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n      <ion-title>Ajouter un lieu</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  \n\n  <ion-list>\n\n  <ion-item>\n\n      <ion-input [(ngModel)]="data.notificationText" type="text" placeholder="nom du lieu" ></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>type d\'evènement</ion-label>\n\n      <ion-select [(ngModel)]="data.transitionType" type="number">\n\n        <ion-option value="1">Entrée dans la zone</ion-option>\n\n        <ion-option value="2">Sortie de la Zone</ion-option>\n\n        <ion-option value="3">Entrée ou Sortie de la zone </ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <ion-item>\n\n        <ion-label>couverture de la zone</ion-label>\n\n      <ion-range min="20" max="100" [(ngModel)]="data.radius"   secondary>\n\n        <ion-label range-left>on</ion-label>\n\n        <ion-label range-right>{{data.radius}}m</ion-label>\n\n      </ion-range>\n\n    </ion-item>\n\n    <ion-item>\n\n        <button ion-button full round color="secondary" type="submit" (click)="addGeofence()">Ajouter</button>\n\n      </ion-item>\n\n  </ion-list>\n\n  \n\n\n\n\n\n  <div #map id="map"></div>\n\n\n\n\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"C:\appp\fyves-sap-final\src\pages\geofence\geofence.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_geofence__["a" /* Geofence */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_device_ngx__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__providers_home_email_service__["a" /* EmailService */]])
    ], GeofencePage);
    return GeofencePage;
}());

var snapshotToArray = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};
//# sourceMappingURL=geofence.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Email */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Email = /** @class */ (function () {
    function Email() {
    }
    return Email;
}());

var EmailService = /** @class */ (function () {
    function EmailService(http) {
        this.http = http;
        this.url = 'http://www.intelcameroun.net/fyvessapback/index.php';
    }
    EmailService.prototype.sendEmail = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.url + '/send_email', JSON.stringify(data), { responseType: 'text' })
                .subscribe(function (res) {
                console.log(res);
                resolve(res);
            }, function (err) {
                console.log(err);
                reject(err);
            });
        });
    };
    EmailService.prototype.sendEmail2 = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.url + '/send_email2', JSON.stringify(data), { responseType: 'text' })
                .subscribe(function (res) {
                console.log(res);
                resolve(res);
            }, function (err) {
                console.log(err);
                reject(err);
            });
        });
    };
    EmailService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], EmailService);
    return EmailService;
}());

//# sourceMappingURL=email.service.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* unused harmony export snapshotToArray */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Firebase__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_home_email_service__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_device_ngx__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MapPage = /** @class */ (function () {
    function MapPage(navCtrl, platform, fire, email, geolocation, device) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.fire = fire;
        this.email = email;
        this.geolocation = geolocation;
        this.device = device;
        this.markers = [];
        this.date = Date();
        this.user = '';
        this.marker_info = '';
        this.email_client = '';
        this.geolocations = [];
        this.geofences = [];
        this.ref = __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref();
        this.ref2 = __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref();
        console.log(geolocation);
        this.UserId = fire.getUserId();
        this.UserEmail = fire.getEmail();
        this.ref = __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(this.UserId + '/geolocations/');
        this.infoWindows = [];
        this.user = this.UserId;
        this.email_client = this.UserEmail;
        this.marker_info = this.UserEmail;
        this.ref2 = __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref('users');
        //  const query = selectconv.orderByChild('chats') ;
        this.ref2.on('value', function (resp) {
            _this.users = [];
            _this.users = snapshotToArray(resp);
            console.log(_this.users);
        });
        platform.ready().then(function () {
            _this.initMap();
        });
        this.ref.on('value', function (resp) {
            // this.deleteMarkers();
            snapshotToArray(resp).forEach(function (data) {
                if (data.uuid !== _this.device.uuid) {
                    var image = 'assets/imgs/green-bike.png';
                    var updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
                    _this.addMarker(updatelocation, image, _this.email_client, Date());
                    _this.setMapOnAll(_this.map);
                }
                else {
                    var image = 'assets/imgs/blue-bike.png';
                    var updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
                    _this.addMarker(updatelocation, image, _this.email_client, Date());
                    _this.setMapOnAll(_this.map);
                }
            });
        });
    }
    MapPage.prototype.portChange = function (event) {
        console.log(event.value);
        var updatelocation = new google.maps.LatLng(event.value.latitude, event.value.longitude);
        var image = 'assets/imgs/blue-bike.png';
        var marker = this.addMarker(updatelocation, image, event.value.email, event.value.lastConnexion);
        this.setMapOnAll(this.map);
        var latLng = marker.getPosition(); // returns LatLng object
        console.log(marker);
        this.map.setCenter(latLng); // setCenter takes a LatLng object
    };
    MapPage.prototype.initMap = function () {
        var _this = this;
        var options = { timeout: 20000, enableHighAccuracy: true };
        this.geolocation.getCurrentPosition(options).then(function (resp) {
            _this.latitude = resp.coords.latitude;
            _this.longitude = resp.coords.longitude;
            var mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            console.log(mylocation);
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, {
                zoom: 15,
                center: mylocation
            });
            __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref('users/' + _this.UserId).set({
                email: _this.email_client,
                lastConnexion: Date(),
                uuid: _this.device.uuid,
                latitude: resp.coords.latitude,
                longitude: resp.coords.longitude,
                userId: _this.UserId
            });
            var image = 'assets/imgs/blue-bike.png';
            _this.addMarker(mylocation, image, _this.email_client, Date());
        });
    };
    MapPage.prototype.addMarker = function (location, image, marker_info, marker_date) {
        var marker = new google.maps.Marker({
            position: location,
            map: this.map,
            icon: image
        });
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading"></h1>' +
            '<div id="bodyContent">' +
            '<p>' + marker_info + '</p>' + '<p>' + marker_date + '</p>';
        '</div>' +
            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        marker.addListener('click', function () {
            infowindow.open(this.map, marker);
        });
        this.markers.push(marker);
        return marker;
    };
    MapPage.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    };
    MapPage.prototype.clearMarkers = function () {
        this.setMapOnAll(null);
    };
    MapPage.prototype.deleteMarkers = function () {
        this.clearMarkers();
        this.markers = [];
    };
    MapPage.prototype.updateGeolocation = function (uuid, lat, lng, date, id_client, email_client) {
        var _this = this;
        var reference = __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref('geofences');
        reference.on('value', function (resp) {
            snapshotToArray(resp).forEach(function (data) {
                _this.geofences = snapshotToArray(resp);
                console.log(_this.geofences);
            });
        });
        this.geofences.forEach(function (element) {
            if (Number((element.latitude).toFixed(3)) === Number((lat).toFixed(3)) && Number((element.longitude).toFixed(3)) === Number((lng).toFixed(3))) {
                var data = { email: email_client, appareil: uuid, latitude: lat, longitude: lng, lieu: element.notification_text };
                _this.email.sendEmail(data);
            }
        });
        __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref('users/' + id_client).set({
            email: email_client,
            lastConnexion: Date(),
            uuid: uuid,
            latitude: lat,
            longitude: lng,
            userId: id_client
        });
        if (localStorage.getItem('mykey')) {
            __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(id_client + '/geolocations/' + localStorage.getItem('mykey')).set({
                uuid: uuid,
                latitude: lat,
                longitude: lng,
                date: Date(),
                email: this.email_client,
            });
        }
        else {
            this.ref = __WEBPACK_IMPORTED_MODULE_2_Firebase__["database"]().ref(id_client + '/geolocations');
            var newData = this.ref.push();
            newData.set({
                uuid: uuid,
                latitude: lat,
                longitude: lng,
                date: Date(),
                email: this.email_client
            });
            localStorage.setItem('mykey', newData.key);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MapPage.prototype, "mapElement", void 0);
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-map',template:/*ion-inline-start:"C:\appp\fyves-sap-final\src\pages\map\map.html"*/'<!--\n\n  Generated template for the MapPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>map</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <ion-item>\n\n        <ion-label>Selectionner un utilisateurs</ion-label>\n\n        <ionic-selectable\n\n        item-content\n\n        [(ngModel)]="data"\n\n        [items]="users"\n\n        itemValueField="key"\n\n        itemTextField="email"\n\n        [canSearch]="true"\n\n        (onChange)="portChange($event)" >\n\n        </ionic-selectable>\n\n      </ion-item>\n\n\n\n  	<div #map id="map"></div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\appp\fyves-sap-final\src\pages\map\map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_home_email_service__["a" /* EmailService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_device_ngx__["a" /* Device */]])
    ], MapPage);
    return MapPage;
}());

var snapshotToArray = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};
//# sourceMappingURL=map.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImagehandlerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_path__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_chooser__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_crop__ = __webpack_require__(395);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ImagehandlerProvider = /** @class */ (function () {
    function ImagehandlerProvider(fileChooser, filePath, file, crop, loadingCtrl) {
        this.fileChooser = fileChooser;
        this.filePath = filePath;
        this.file = file;
        this.crop = crop;
        this.loadingCtrl = loadingCtrl;
        this.firestore = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.storage();
        console.log('Hello ImagehandlerProvider Provider');
    }
    ImagehandlerProvider.prototype.uploadimage = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please wait'
        });
        loader.present();
        var promise = new Promise(function (resolve, reject) {
            _this.fileChooser.open().then(function (urlfull) {
                _this.crop.crop(urlfull).then(function (url) {
                    window.FilePath.resolveNativePath(url, function (result) {
                        _this.nativepath = result;
                        window.resolveLocalFileSystemURL(_this.nativepath, function (res) {
                            res.file(function (resFile) {
                                var reader = new FileReader();
                                reader.readAsArrayBuffer(resFile);
                                reader.onloadend = function (evt) {
                                    var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                                    var imageStore = _this.firestore.ref('/profileimages').child(__WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser.uid);
                                    imageStore.put(imgBlob).then(function (res) {
                                        _this.firestore.ref('/profileimages').child(__WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser.uid).getDownloadURL().then(function (url) {
                                            resolve(url);
                                            loader.dismiss();
                                        }).catch(function (err) {
                                            loader.dismiss();
                                            reject(err);
                                        });
                                    }).catch(function (err) {
                                        loader.dismiss();
                                        reject(err);
                                    });
                                };
                            });
                        });
                    });
                });
            });
            loader.dismiss();
        });
        return promise;
    };
    ImagehandlerProvider.prototype.picmsgstore = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.fileChooser.open().then(function (url) {
                window.FilePath.resolveNativePath(url, function (result) {
                    _this.nativepath = result;
                    window.resolveLocalFileSystemURL(_this.nativepath, function (res) {
                        res.file(function (resFile) {
                            var reader = new FileReader();
                            reader.readAsArrayBuffer(resFile);
                            reader.onloadend = function (evt) {
                                var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                                var uuid = _this.guid();
                                var imageStore = _this.firestore.ref('/picmsgs').child(__WEBPACK_IMPORTED_MODULE_5_firebase___default.a.auth().currentUser.uid).child('picmsg' + uuid);
                                imageStore.put(imgBlob).then(function (res) {
                                    resolve(res.downloadURL);
                                }).catch(function (err) {
                                    reject(err);
                                })
                                    .catch(function (err) {
                                    reject(err);
                                });
                            };
                        });
                    });
                });
            });
        });
        return promise;
    };
    ImagehandlerProvider.prototype.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    ImagehandlerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_file_chooser__["a" /* FileChooser */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_path__["a" /* FilePath */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_crop__["a" /* Crop */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], ImagehandlerProvider);
    return ImagehandlerProvider;
}());

//# sourceMappingURL=imagehandler.js.map

/***/ }),

/***/ 205:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 205;

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/all-users/all-users.module": [
		396
	],
	"../pages/buddies/buddies.module": [
		398
	],
	"../pages/buddychat/buddychat.module": [
		848,
		6
	],
	"../pages/chats/chats.module": [
		250
	],
	"../pages/geofence/geofence.module": [
		410
	],
	"../pages/groups/groups.module": [
		849,
		5
	],
	"../pages/home/home.module": [
		851,
		8
	],
	"../pages/login/login.module": [
		850,
		7
	],
	"../pages/map/map.module": [
		406
	],
	"../pages/profile/profile.module": [
		852,
		4
	],
	"../pages/profilepic/profilepic.module": [
		853,
		3
	],
	"../pages/ragister/ragister.module": [
		856,
		2
	],
	"../pages/request/request.module": [
		855,
		1
	],
	"../pages/sendmail/sendmail.module": [
		408
	],
	"../pages/tabs/tabs.module": [
		854,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 249;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatsPageModule", function() { return ChatsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chats__ = __webpack_require__(251);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatsPageModule = /** @class */ (function () {
    function ChatsPageModule() {
    }
    ChatsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__chats__["a" /* ChatsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chats__["a" /* ChatsPage */]),
            ],
        })
    ], ChatsPageModule);
    return ChatsPageModule;
}());

//# sourceMappingURL=chats.module.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_requests_requests__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_imagehandler_imagehandler__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChatsPage = /** @class */ (function () {
    function ChatsPage(navCtrl, navParams, requestservice, events, alertCtrl, chatservice, zone, popoverCtrl, imghandler, userservice, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.requestservice = requestservice;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.chatservice = chatservice;
        this.zone = zone;
        this.popoverCtrl = popoverCtrl;
        this.imghandler = imghandler;
        this.userservice = userservice;
        this.loadingCtrl = loadingCtrl;
        // messagecounter;
        this.requestcounter = null;
        this.setStatus();
        // this.events.subscribe('counter', () => {
        //   this.zone.run(()=>{
        //     this.messagecounter= this.chatservice.msgcount;
        //     console.log(this.messagecounter);
        //   })
        // })
    }
    ChatsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please wait'
        });
        loader.present();
        this.requestservice.getmyrequests();
        this.requestservice.getmyfriends();
        this.loaduserdetails();
        console.log(this.user);
        this.myfriends = [];
        this.events.subscribe('gotrequests', function () {
            _this.myrequests = [];
            _this.myrequests = _this.requestservice.userdetails;
            console.log('this.myrequests', _this.myrequests);
            loader.dismiss();
            if (_this.myrequests) {
                _this.requestcounter = _this.myrequests.length;
            }
        });
        this.events.subscribe('friends', function () {
            _this.myfriends = [];
            _this.myfriends = _this.requestservice.myfriends;
            console.log('myfriends', _this.myfriends);
            loader.dismiss();
            // for(let i = 0;i<this.myfriends.length;i++){
            //
            //   console.log('requestcounter',this.requestcounter)
            //   console.log('user > ',this.myfriends[i])
            //   this.chatservice.getmsgCounter(this.myfriends[i]);
            // }
        });
    };
    ChatsPage.prototype.addbuddy = function () {
        this.navCtrl.push('BuddiesPage');
    };
    ChatsPage.prototype.buddychat = function (buddy) {
        this.chatservice.initializebuddy(buddy);
        this.navCtrl.push('BuddychatPage');
    };
    ChatsPage.prototype.setStatus = function () {
        this.chatservice.setstatusUser().then(function (res) {
            if (res) {
                console.log('User Online');
            }
        }).catch(function (err) {
            alert(err);
        });
    };
    ChatsPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create('RequestPage', {});
        popover.present({
            ev: myEvent
        });
    };
    //profile data
    ChatsPage.prototype.loaduserdetails = function () {
        var _this = this;
        this.userservice.getuserdetails().then(function (res) {
            _this.username = res.displayName;
            _this.zone.run(function () {
                _this.avatar = res.photoURL;
            });
        });
    };
    ChatsPage.prototype.logout = function () {
        var _this = this;
        this.chatservice.setStatusOffline().then(function (res) {
            if (res) {
                __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.auth().signOut().then(function () {
                    _this.navCtrl.setRoot('LoginPage');
                });
            }
        });
    };
    ChatsPage.prototype.editname = function () {
        var _this = this;
        var statusalert = this.alertCtrl.create({
            buttons: ['okay']
        });
        var alert = this.alertCtrl.create({
            title: 'Edit Nickname',
            inputs: [{
                    name: 'nickname',
                    placeholder: 'Nickname'
                }],
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Edit',
                    handler: function (data) {
                        if (data.nickname) {
                            _this.userservice.updatedisplayname(data.nickname).then(function (res) {
                                if (res.success) {
                                    statusalert.setTitle('Updated');
                                    statusalert.setSubTitle('Your username has been changed successfully!!');
                                    statusalert.present();
                                    _this.zone.run(function () {
                                        _this.username = data.nickname;
                                    });
                                }
                                else {
                                    statusalert.setTitle('Failed');
                                    statusalert.setSubTitle('Your username was not changed');
                                    statusalert.present();
                                }
                            });
                        }
                    }
                }]
        });
        alert.present();
    };
    ChatsPage.prototype.editimage = function () {
        var _this = this;
        var statusalert = this.alertCtrl.create({
            buttons: ['okay']
        });
        this.imghandler.uploadimage().then(function (url) {
            _this.userservice.updateimage(url).then(function (res) {
                if (res.success) {
                    statusalert.setTitle('Updated');
                    statusalert.setSubTitle('Your profile pic has been changed successfully!!');
                    statusalert.present();
                    _this.zone.run(function () {
                        _this.avatar = url;
                    });
                }
            }).catch(function (err) {
                statusalert.setTitle('Failed');
                statusalert.setSubTitle('Your profile pic was not changed');
                statusalert.present();
            });
        });
    };
    ChatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chats',template:/*ion-inline-start:"C:\appp\fyves-sap-final\src\pages\chats\chats.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n      \n\n    <div class="profile-image-wrap">\n\n      <div class="profile-image"  (click)="editimage()">\n\n          <img src="{{avatar}}">\n\n      </div>\n\n    </div>\n\n    <div class="profile-info">\n\n      <div class="title">\n\n        <h2 (click)="editname()">{{username}}</h2>\n\n      </div>\n\n      <div class="subtitle">\n\n        Modifier votre nom d\'utilisateur ou votre photo de profil\n\n      </div>\n\n    </div>\n\n    <div class="spacer" style="height: 10px;"></div>\n\n    <div>\n\n      <!-- <button ion-button round outline color="danger" (click)="logout()">Logout</button> -->\n\n    </div>\n\n     <ion-buttons end>\n\n\n\n       <button ion-button icon-only (click)="presentPopover($event)">\n\n         <ion-icon name="notifications"></ion-icon><div class="notification" *ngIf="requestcounter != null">{{requestcounter}}</div>\n\n       </button>\n\n     </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <div *ngIf="myfriends == \'\' " class="backdropdiv">\n\n    <div class="focus-on">\n\n      <ion-fab bottom right>\n\n        <button ion-fab color="primary" (click)="addbuddy()"><ion-icon name="person-add"></ion-icon></button>\n\n      </ion-fab>\n\n    </div>\n\n    <div class="instrucation">\n\n      <p style="color:#fff;">Clicker pour démarrer une conversation</p>\n\n    <img src="assets/imgs/introarrrow.png">\n\n    </div>\n\n  </div>\n\n\n\n<div padding *ngIf="myfriends != \'\' ">\n\n  <ion-list no-lines >\n\n    <!-- <ion-list-header>Friends</ion-list-header> -->\n\n    <ion-item *ngFor="let item of myfriends" (click)="buddychat(item)">\n\n      <ion-avatar item-left>\n\n        <img src={{item.photoURL}}>\n\n      </ion-avatar>\n\n      <h3>{{item.displayName}}</h3>\n\n      <!-- <button ion-button round color="danger" item-right right *ngIf="messagecounter != 0">{{messagecounter}}</button> -->\n\n    </ion-item>\n\n  </ion-list>\n\n  <ion-fab bottom right>\n\n    <button ion-fab color="primary" (click)="addbuddy()"><ion-icon name="person-add"></ion-icon></button>\n\n  </ion-fab>\n\n</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\appp\fyves-sap-final\src\pages\chats\chats.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_requests_requests__["a" /* RequestsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat__["a" /* ChatProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_5__providers_imagehandler_imagehandler__["a" /* ImagehandlerProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], ChatsPage);
    return ChatsPage;
}());

//# sourceMappingURL=chats.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllUsersPageModule", function() { return AllUsersPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__all_users__ = __webpack_require__(397);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AllUsersPageModule = /** @class */ (function () {
    function AllUsersPageModule() {
    }
    AllUsersPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__all_users__["a" /* AllUsersPage */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__all_users__["a" /* AllUsersPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */]]
        })
    ], AllUsersPageModule);
    return AllUsersPageModule;
}());

//# sourceMappingURL=all-users.module.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllUsersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_user_user__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the AllUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AllUsersPage = /** @class */ (function () {
    function AllUsersPage(navCtrl, navParams, userService, loadingCtrl, toastCtrl, fb, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.userService.getallusers().then(function (allusers) {
            _this.users = allusers;
            console.log(_this.users);
        });
    }
    AllUsersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RagisterPage');
    };
    AllUsersPage.prototype.doSignup = function () {
        this.navCtrl.push('RagisterPage');
    };
    AllUsersPage.prototype.openRegister = function (event, u) {
        this.navCtrl.push('RagisterPage', {
            a: u
        });
    };
    AllUsersPage.prototype.showConfirm = function (uid) {
        var _this = this;
        console.log(uid);
        var confirm = this.alertCtrl.create({
            title: 'supprimer un utilisateur',
            message: 'voulez vous vraiment suprimer cet utilisateur ainsi que toutes ses informations?',
            buttons: [
                {
                    text: 'annuler',
                    handler: function () {
                        console.log('supression annule');
                    }
                },
                {
                    text: 'suprimer',
                    handler: function () {
                        _this.userService.deleteUser(uid);
                        _this.ionViewDidLoad();
                    }
                }
            ]
        });
        confirm.present();
    };
    AllUsersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-all-users',template:/*ion-inline-start:"C:\appp\fyves-sap-final\src\pages\all-users\all-users.html"*/'<!--\n\n  Generated template for the AllUsersPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>all_users <ion-icon ios="ios-add-circle" md="md-add-circle" rigth (click)="doSignup()"></ion-icon></ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n\n\n<ion-list>\n\n <!-- <ion-item *ngFor="let u of users">\n\n    <ion-icon color="primary"  [name]="md-add-circle" item-rigth></ion-icon>\n\n    <p>{{u.displayName}}</p><p>{{u.role}}</p>\n\n  </ion-item>\n\n-->\n\n  <ion-grid>\n\n    <ion-row  *ngFor="let u of users" >\n\n      <ion-col class=\'test\'><p>{{u.displayName}}</p></ion-col>\n\n      <ion-col class=\'test\'><p>{{u.email}}</p></ion-col>\n\n      <ion-col class=\'test\'><p>{{u.role}}</p></ion-col>\n\n      <ion-col class=\'test\'><p>{{u.phone}}</p></ion-col>\n\n      <ion-col class=\'test\'><p> <ion-icon (click)="showConfirm(u.uid)" ios="ios-trash" md="md-trash" col-left></ion-icon><ion-icon (click)="openRegister($event,u)" ios="ios-create" md="md-create"></ion-icon></p></ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\appp\fyves-sap-final\src\pages\all-users\all-users.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */]])
    ], AllUsersPage);
    return AllUsersPage;
}());

//# sourceMappingURL=all-users.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuddiesPageModule", function() { return BuddiesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buddies__ = __webpack_require__(399);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BuddiesPageModule = /** @class */ (function () {
    function BuddiesPageModule() {
    }
    BuddiesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__buddies__["a" /* BuddiesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__buddies__["a" /* BuddiesPage */]),
            ],
        })
    ], BuddiesPageModule);
    return BuddiesPageModule;
}());

//# sourceMappingURL=buddies.module.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuddiesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_requests_requests__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the BuddiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BuddiesPage = /** @class */ (function () {
    function BuddiesPage(navCtrl, navParams, userservice, alertCtrl, requestservice) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userservice = userservice;
        this.alertCtrl = alertCtrl;
        this.requestservice = requestservice;
        this.newrequest = {};
        this.temparr = [];
        this.filteredusers = [];
        this.userservice.getallusers().then(function (res) {
            _this.filteredusers = res;
            _this.temparr = res;
        });
    }
    BuddiesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BuddiesPage');
    };
    BuddiesPage.prototype.searchuser = function (searchbar) {
        this.filteredusers = this.temparr;
        var q = searchbar.target.value;
        if (q.trim() == '') {
            return;
        }
        this.filteredusers = this.filteredusers.filter(function (v) {
            if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
            }
            return false;
        });
    };
    BuddiesPage.prototype.sendreq = function (recipient) {
        var _this = this;
        this.newrequest.sender = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().currentUser.uid;
        this.newrequest.recipient = recipient.uid;
        if (this.newrequest.sender === this.newrequest.recipient)
            alert('You are your friend always');
        else {
            var successalert_1 = this.alertCtrl.create({
                title: 'Request sent',
                subTitle: 'Your request was sent to ' + recipient.displayName,
                buttons: ['ok']
            });
            this.requestservice.sendrequest(this.newrequest).then(function (res) {
                if (res.success) {
                    successalert_1.present();
                    var sentuser = _this.filteredusers.indexOf(recipient);
                    _this.filteredusers.splice(sentuser, 1);
                }
            }).catch(function (err) {
                alert(err);
            });
        }
    };
    BuddiesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-buddies',template:/*ion-inline-start:"C:\appp\fyves-sap-final\src\pages\buddies\buddies.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle >\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n		<ion-title>Invitations</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-searchbar [(ngModel)]="searchstring" (input)="searchuser($event)" placeholder="Search"></ion-searchbar>\n\n<ion-list>\n\n    <ion-item *ngFor="let key of filteredusers">\n\n        <ion-avatar item-start><img src="{{key.photoURL}}"></ion-avatar>\n\n        <h2>{{key.displayName}}</h2>\n\n        <button ion-button item-end outline color="primary" (click)="sendreq(key)"><ion-icon name="person-add"></ion-icon>Envoyer</button>\n\n    </ion-item>\n\n\n\n</ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\appp\fyves-sap-final\src\pages\buddies\buddies.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_requests_requests__["a" /* RequestsProvider */]])
    ], BuddiesPage);
    return BuddiesPage;
}());

//# sourceMappingURL=buddies.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CallService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CallService = /** @class */ (function () {
    function CallService() {
    }
    CallService.prototype.call = function (phoneNumber) {
        window.location.href = 'tel:' + phoneNumber;
    };
    CallService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], CallService);
    return CallService;
}());

//# sourceMappingURL=call.service.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MapsService = /** @class */ (function () {
    function MapsService(platform) {
        this.platform = platform;
    }
    MapsService.prototype.openMapsApp = function (location) {
        var q;
        if (this.platform.is('android')) {
            q = 'geo:' + location;
        }
        else {
            q = 'maps://maps.apple.com/?q=' + location;
        }
        window.location.href = q;
    };
    MapsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */]])
    ], MapsService);
    return MapsService;
}());

//# sourceMappingURL=maps.service.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapPageModule", function() { return MapPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__map__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__ = __webpack_require__(407);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MapPageModule = /** @class */ (function () {
    function MapPageModule() {
    }
    MapPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__map__["a" /* MapPage */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__map__["a" /* MapPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__["a" /* IonicSelectableModule */]]
        })
    ], MapPageModule);
    return MapPageModule;
}());

//# sourceMappingURL=map.module.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendmailPageModule", function() { return SendmailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sendmail__ = __webpack_require__(825);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SendmailPageModule = /** @class */ (function () {
    function SendmailPageModule() {
    }
    SendmailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__sendmail__["a" /* SendmailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__sendmail__["a" /* SendmailPage */]),
            ],
        })
    ], SendmailPageModule);
    return SendmailPageModule;
}());

//# sourceMappingURL=sendmail.module.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeofencePageModule", function() { return GeofencePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geofence__ = __webpack_require__(168);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GeofencePageModule = /** @class */ (function () {
    function GeofencePageModule() {
    }
    GeofencePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__geofence__["a" /* GeofencePage */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__geofence__["a" /* GeofencePage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */]]
        })
    ], GeofencePageModule);
    return GeofencePageModule;
}());

//# sourceMappingURL=geofence.module.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, authService, fb, loadingCtrl, menu) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.menu = menu;
        this.credentials = {};
        this.passwordtype = 'password';
        this.passeye = 'eye';
        this.authForm = this.fb.group({
            'email': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'password': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
        });
        this.email = this.authForm.controls['email'];
        this.password = this.authForm.controls['password'];
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
        this.menu.enable(false);
    };
    LoginPage.prototype.ionViewDidLeave = function () {
        this.menu.enable(true);
    };
    LoginPage.prototype.forgePassword = function () {
    };
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please wait'
        });
        loader.present();
        this.authService.login(this.credentials).then(function (res) {
            if (!res.code) {
                loader.dismiss();
                _this.navCtrl.setRoot('HomePage');
            }
            else {
                loader.dismiss();
                alert(res);
            }
            loader.dismiss();
        });
    };
    LoginPage.prototype.doSignup = function () {
        this.navCtrl.push('RagisterPage');
    };
    LoginPage.prototype.managePassword = function () {
        if (this.passwordtype == 'password') {
            this.passwordtype = 'text';
            this.passeye = 'eye-off';
        }
        else {
            this.passwordtype = 'password';
            this.passeye = 'eye';
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\appp\fyves-sap-final\src\pages\login\login.html"*/'  <ion-content class="bg-img">\n\n    <div padding class="container-bottom">\n\n\n\n        <div class="main-content">\n\n          <div class="container-logo" padding="" text-center="">\n\n            <img src="assets/imgs/logo.png">\n\n          </div>\n\n        </div>\n\n        <form [formGroup]="authForm">\n\n        <ion-card>\n\n          <ion-card-content>\n\n              <div class="errormsg">\n\n                <div *ngIf="email.errors && email.touched">\n\n                  <p>Email obligatoire.</p>\n\n                </div>\n\n                <div *ngIf="password.errors && password.touched">\n\n                  <p>Mot de passe obligatoire.</p>\n\n                </div>\n\n              </div>\n\n              <ion-list>\n\n                  <ion-item>\n\n                      <ion-label><ion-icon ios="ios-mail" md="md-mail"></ion-icon></ion-label>\n\n                      <ion-input type="email" [formControl]="email" id="email" placeholder="Email" name="email" [(ngModel)]="credentials.email"></ion-input>\n\n                  </ion-item>\n\n                  <ion-item>\n\n                      <ion-input type="{{passwordtype}}" [formControl]="password" id="password"  placeholder="Mot de passe" name="password" [(ngModel)]="credentials.password"></ion-input>\n\n                      <button ion-button class="eye-icon-btn" type="button" item-right (click)="managePassword()"><ion-icon name="{{passeye}}"></ion-icon></button>\n\n                  </ion-item>\n\n                  <div class="button-container">\n\n                    <button ion-button full round outline color="dark" [disabled]="!authForm.valid" (click)="doLogin()">Connexion</button>\n\n                  </div>\n\n              </ion-list>\n\n          </ion-card-content>\n\n      </ion-card>\n\n      <div text-center class="form-bottom-text">\n\n        <label> FYVES S.A.P (service à la personne)</label>\n\n      </div>\n\n    </form>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\appp\fyves-sap-final\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_home_call_service__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_home_maps_service__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_data__ = __webpack_require__(819);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__geofence_geofence__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__map_map__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__buddies_buddies__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_Firebase__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_fcm__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_user_user__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__login_login__ = __webpack_require__(452);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomePage = /** @class */ (function () {
    function HomePage(platform, navCtrl, callService, mapsService, nav, callNumber, fcm, menuCtrl, userservice, events) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.callNumber = callNumber;
        this.fcm = fcm;
        this.menuCtrl = menuCtrl;
        this.userservice = userservice;
        this.events = events;
        //this.myp.getrole();
        this.userservice.getuserdetails().then(function (value) {
            console.log(value.role);
            _this.role = value.role;
        });
        console.log(this.role);
    }
    HomePage_1 = HomePage;
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad HomePage la vue est charge');
        __WEBPACK_IMPORTED_MODULE_9_Firebase__["auth"]().onAuthStateChanged(function (user) {
            if (user) {
                this.nav.setRoot(HomePage_1); //to the page where user navigates after login
                // User is signed in.
            }
            else {
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__login_login__["a" /* LoginPage */]); // to the login page as user is not logged in
                // No user is signed in.
            }
        });
        this.userservice.getuserdetails().then(function (value) {
            console.log(value.role);
            _this.events.publish('test', value.role, Date.now());
        });
        this.fcm.subscribeToTopic('marketing');
        this.fcm.getToken().then(function (token) {
            // backend.registerToken(token);
            console.log(token);
            _this.addToken(token);
        });
        this.fcm.onNotification().subscribe(function (data) {
            if (data.wasTapped) {
                console.log("Received in background");
            }
            else {
                console.log("Received in foreground");
            }
            ;
        });
        this.fcm.onTokenRefresh().subscribe(function (token) {
            // backend.registerToken(token);
            _this.addToken(token);
        });
    };
    HomePage.prototype.initTiles = function () {
        this.tiles = [[{
                    title: 'Géo-répérage',
                    path: 'map',
                    icon: 'md-pin',
                    component: __WEBPACK_IMPORTED_MODULE_5__geofence_geofence__["a" /* GeofencePage */]
                }, {
                    title: 'Chat List',
                    path: 'chats',
                    icon: 'swap',
                    component: __WEBPACK_IMPORTED_MODULE_7__buddies_buddies__["a" /* BuddiesPage */]
                }], [{
                    title: 'Map',
                    path: 'map',
                    icon: 'map',
                    component: __WEBPACK_IMPORTED_MODULE_6__map_map__["a" /* MapPage */]
                }]];
    };
    HomePage.prototype.navigateTo = function (tile) {
        this.nav.setRoot(tile.component);
    };
    HomePage.prototype.getDirections = function () {
        this.mapsService.openMapsApp(__WEBPACK_IMPORTED_MODULE_4__home_data__["a" /* data */].officeLocation);
    };
    HomePage.prototype.opensendEmail = function () {
        this.navCtrl.push('SendmailPage');
        // this.submit();
        // this.emailService.sendEmail(data.email);
    };
    HomePage.prototype.openFacebookPage = function () {
        var _this = this;
        //this.browserService.open("https://www.facebook.com/Fyves-Consulting-2706747922686031/inbox/?mailbox_id=2706747922686031&selected_item_id=100000905805675");
        this.browserTab.isAvailable()
            .then(function (isAvailable) {
            if (isAvailable) {
                _this.browserTab.openUrl('https://www.facebook.com/Fyves-Consulting-2706747922686031/?ref=settings');
            }
            else {
                // open URL with InAppBrowser instead or SafariViewController
            }
        });
    };
    HomePage.prototype.callUs = function () {
        //this.callService.call(data.phoneNumber);
        this.callNumber.callNumber("+237694812502", true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return console.log('Error launching dialer', err); });
    };
    HomePage.prototype.redirect = function () {
        //this.inAppBrowser.create("https://www.w3schools.com/php/");
    };
    HomePage.prototype.addToken = function (token) {
        var promise = new Promise(function (resolve, reject) {
            var dbref = __WEBPACK_IMPORTED_MODULE_9_Firebase__["database"]().ref('/users');
            dbref.child(__WEBPACK_IMPORTED_MODULE_9_Firebase__["auth"]().currentUser.uid + '/notificationTokens/').set({
                notificationToken: token
            })
                .then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    var HomePage_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    HomePage = HomePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\appp\fyves-sap-final\src\pages\home\home.html"*/'<!--\n\n  Generated template for the HomePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle >\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n		<ion-title>Fyves SAP</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content class="getting-started">\n\n	<div class="home-hello">\n\n		<img src="assets/imgs/home.png" />\n\n\n\n<!--	<div class="hello-title" text-wrap>\n\n			<h1>FYVES SAP</h1>\n\n			Une nouvelle vision des affaires !\n\n		</div>     -->\n\n	</div>\n\n\n\n	\n\n\n\n	<ion-row *ngFor="let tilePair of tiles">\n\n		<ion-col *ngFor="let tile of tilePair">\n\n			<ion-card class="tile" (click)="navigateTo(tile)">\n\n				<ion-card-content>\n\n					<ion-item>\n\n						<h1><ion-icon color="primary" [name]="tile.icon"></ion-icon></h1>\n\n						<h2>{{tile.title}}</h2>\n\n					</ion-item>\n\n				</ion-card-content>\n\n			</ion-card>\n\n		</ion-col>\n\n	</ion-row>\n\n\n\n\n\n\n\n	<ion-row>\n\n		<ion-card class="quick-action" (click)="callUs()">\n\n			<ion-card-content>\n\n				<ion-icon name="phone-portrait"></ion-icon>\n\n				<span>Call us</span>\n\n			</ion-card-content>\n\n		</ion-card>\n\n	</ion-row>\n\n\n\n	<ion-row>\n\n		<ion-card class="quick-action" (click)="opensendEmail()">\n\n			<ion-card-content>\n\n				<ion-icon name="mail"></ion-icon>\n\n				<span>contact@fyvesconsulting.com</span>\n\n			</ion-card-content>\n\n		</ion-card>\n\n	</ion-row>\n\n\n\n	<ion-row>\n\n		<ion-card class="quick-action" (click)="getDirections()">\n\n			<ion-card-content>\n\n				<ion-icon name="compass"></ion-icon>\n\n				<span>Find us / Get directions</span>\n\n			</ion-card-content>\n\n		</ion-card>\n\n	</ion-row>\n\n\n\n	<ion-row>\n\n		<ion-card class="quick-action" (click)="redirect()">\n\n			<ion-card-content ng-href="https://www.facebook.com/Fyves-Consulting-2706747922686031/?ref=settings" onclick="window.open(this.href, _system ,location=yes);">\n\n				<ion-icon name="logo-facebook"></ion-icon>\n\n				<span>Visit us on Facebook</span>\n\n			</ion-card-content>\n\n		</ion-card>\n\n	</ion-row>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\appp\fyves-sap-final\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_home_call_service__["a" /* CallService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_home_call_service__["a" /* CallService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_home_maps_service__["a" /* MapsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_home_maps_service__["a" /* MapsService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__["a" /* CallNumber */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__["a" /* CallNumber */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_10__ionic_native_fcm__["a" /* FCM */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__ionic_native_fcm__["a" /* FCM */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_11__providers_user_user__["a" /* UserProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__providers_user_user__["a" /* UserProvider */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]) === "function" && _k || Object])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(459);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_path__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_chooser__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(843);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_angularfireconfig__ = __webpack_require__(844);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_auth_auth__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_user_user__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_imagehandler_imagehandler__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_requests_requests__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_chat_chat__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_crop__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_geofence_geofence_module__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_home_email_service__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_home_maps_service__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_home_call_service__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_home_in_app_browser_service__ = __webpack_require__(845);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_buddies_buddies_module__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_chats_chats_module__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_fcm__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_chat_token__ = __webpack_require__(846);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_all_users_all_users_module__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_geolocation__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_geofence__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_device_ngx__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_call_number__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_browser_tab__ = __webpack_require__(847);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_email_composer__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__angular_common_http__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_sendmail_sendmail_module__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_map_map_module__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_ionic_selectable__ = __webpack_require__(407);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], { tabsPlacement: 'top' }, {
                    links: [
                        { loadChildren: '../pages/chats/chats.module#ChatsPageModule', name: 'ChatsPage', segment: 'chats', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/all-users/all-users.module#AllUsersPageModule', name: 'AllUsersPage', segment: 'all-users', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/buddychat/buddychat.module#BuddychatPageModule', name: 'BuddychatPage', segment: 'buddychat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/groups/groups.module#GroupsPageModule', name: 'GroupsPage', segment: 'groups', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/buddies/buddies.module#BuddiesPageModule', name: 'BuddiesPage', segment: 'buddies', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/map/map.module#MapPageModule', name: 'MapPage', segment: 'map', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profilepic/profilepic.module#ProfilepicPageModule', name: 'ProfilepicPage', segment: 'profilepic', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/request/request.module#RequestPageModule', name: 'RequestPage', segment: 'request', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ragister/ragister.module#RagisterPageModule', name: 'RagisterPage', segment: 'ragister', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sendmail/sendmail.module#SendmailPageModule', name: 'SendmailPage', segment: 'sendmail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/geofence/geofence.module#GeofencePageModule', name: 'GeofencePage', segment: 'geofence', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_18__pages_geofence_geofence_module__["GeofencePageModule"],
                __WEBPACK_IMPORTED_MODULE_23__pages_buddies_buddies_module__["BuddiesPageModule"],
                __WEBPACK_IMPORTED_MODULE_24__pages_chats_chats_module__["ChatsPageModule"],
                __WEBPACK_IMPORTED_MODULE_27__pages_all_users_all_users_module__["AllUsersPageModule"],
                __WEBPACK_IMPORTED_MODULE_35__pages_sendmail_sendmail_module__["SendmailPageModule"],
                __WEBPACK_IMPORTED_MODULE_36__pages_map_map_module__["MapPageModule"],
                __WEBPACK_IMPORTED_MODULE_37_ionic_selectable__["a" /* IonicSelectableModule */],
                __WEBPACK_IMPORTED_MODULE_11_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_9__app_angularfireconfig__["a" /* config */]),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__["a" /* AngularFireAuth */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_12__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_13__providers_user_user__["a" /* UserProvider */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_chooser__["a" /* FileChooser */],
                __WEBPACK_IMPORTED_MODULE_14__providers_imagehandler_imagehandler__["a" /* ImagehandlerProvider */],
                __WEBPACK_IMPORTED_MODULE_15__providers_requests_requests__["a" /* RequestsProvider */],
                __WEBPACK_IMPORTED_MODULE_16__providers_chat_chat__["a" /* ChatProvider */],
                __WEBPACK_IMPORTED_MODULE_16__providers_chat_chat__["a" /* ChatProvider */],
                __WEBPACK_IMPORTED_MODULE_19__providers_home_email_service__["a" /* EmailService */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_geofence__["a" /* Geofence */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_device_ngx__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_browser_tab__["a" /* BrowserTab */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_34__angular_common_http__["a" /* HttpClient */],
                __WEBPACK_IMPORTED_MODULE_34__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__["a" /* AngularFireAuth */],
                __WEBPACK_IMPORTED_MODULE_12__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_20__providers_home_maps_service__["a" /* MapsService */],
                __WEBPACK_IMPORTED_MODULE_21__providers_home_call_service__["a" /* CallService */],
                //HttpHandler,
                __WEBPACK_IMPORTED_MODULE_22__providers_home_in_app_browser_service__["a" /* InAppBrowserService */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_fcm__["a" /* FCM */],
                __WEBPACK_IMPORTED_MODULE_26__providers_chat_token__["a" /* TokenProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UserProvider = /** @class */ (function () {
    function UserProvider(afireAuth) {
        this.afireAuth = afireAuth;
        this.firedata = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/users');
        this.uid = new __WEBPACK_IMPORTED_MODULE_3_rxjs__["BehaviorSubject"]('');
        console.log('Hello UserProvider Provider');
    }
    UserProvider.prototype.adduser = function (newuser) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.afireAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(function () {
                _this.afireAuth.auth.currentUser.updateProfile({
                    displayName: newuser.username,
                    photoURL: 'https://www.limestone.edu/sites/default/files/user.png'
                }).then(function () {
                    _this.firedata.child(_this.afireAuth.auth.currentUser.uid).set({
                        uid: _this.afireAuth.auth.currentUser.uid,
                        displayName: newuser.username,
                        phone: newuser.phone,
                        role: newuser.role,
                        photoURL: 'https://www.limestone.edu/sites/default/files/user.png'
                    }).then(function () {
                        resolve(true);
                    }).catch(function (err) {
                        reject(err);
                    });
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider.prototype.updateimage = function (imageurl) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.afireAuth.auth.currentUser.updateProfile({
                displayName: _this.afireAuth.auth.currentUser.displayName,
                photoURL: imageurl
            }).then(function () {
                _this.firedata.child(_this.afireAuth.auth.currentUser.uid).update({ photoURL: imageurl }).then(function () {
                    __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/users/' + __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).update({
                        displayName: _this.afireAuth.auth.currentUser.displayName,
                        photoURL: imageurl,
                        uid: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid
                    }).then(function () {
                        resolve({ success: true });
                    }).catch(function (err) {
                        reject(err);
                    });
                });
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider.prototype.getuserdetails = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.firedata.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).once('value', function (snapshot) {
                resolve(snapshot.val());
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider.prototype.updatedisplayname = function (newname, newphone, newrole) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.afireAuth.auth.currentUser.updateProfile({
                displayName: newname,
                photoURL: _this.afireAuth.auth.currentUser.photoURL
            }).then(function () {
                _this.firedata.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).update({
                    displayName: newname,
                    photoURL: _this.afireAuth.auth.currentUser.photoURL,
                    uid: _this.afireAuth.auth.currentUser.uid
                }).then(function () {
                    resolve({ success: true });
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider.prototype.deleteUser = function (uid) {
        this.firedata.child(uid).remove();
    };
    UserProvider.prototype.getallusers = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.firedata.orderByChild('uid').once('value', function (snapshot) {
                var userdata = snapshot.val();
                var temparr = [];
                for (var key in userdata) {
                    temparr.push(userdata[key]);
                }
                resolve(temparr);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], UserProvider);
    return UserProvider;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 819:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return data; });
var data = {
    facebook: 'https://www.facebook.com/',
    phoneNumber: '+237659417414',
    email: {
        to: 'contact@fyvesconsulting.com',
        subject: 'Fyves SAP',
        body: 'Bienvenue'
    },
    officeLocation: '4.0446916, 9.6989359'
};
//# sourceMappingURL=home-data.js.map

/***/ }),

/***/ 825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendmailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__ = __webpack_require__(409);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SendmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SendmailPage = /** @class */ (function () {
    function SendmailPage(navCtrl, navParams, emailComposer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.emailComposer = emailComposer;
        this.Subject = '';
        this.body = '';
        this.to = 'simopatrice415@gmail.com';
    }
    SendmailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SendmailPage');
    };
    SendmailPage.prototype.send = function () {
        var email = {
            to: this.to,
            cc: [],
            bcc: [],
            attachment: [],
            subject: this.body,
            body: this.body,
            isHtml: false,
            app: "Gmail"
        };
        this.emailComposer.open(email);
    };
    SendmailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sendmail',template:/*ion-inline-start:"C:\appp\fyves-sap-final\src\pages\sendmail\sendmail.html"*/'<!--\n  Generated template for the SendmailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>sendmail</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div padding>\n  <ion-item>\n    <ion-label color="primary" stacked>subject</ion-label>\n    <ion-input [(ngModel)]="subject" type="text" placeholder="type your subject"></ion-input>\n  </ion-item>\n  <ion-item>\n      <ion-label color="primary" stacked>body content</ion-label>\n      <ion-input [(ngModel)]="body" type="text" placeholder="type your content"></ion-input>\n    </ion-item>\n    <ion-item>\n        <ion-label color="primary" stacked>to FYVES </ion-label>\n      </ion-item>\n  <button ion-button block (click)="send">send</button>\n</div >\n</ion-content>\n'/*ion-inline-end:"C:\appp\fyves-sap-final\src\pages\sendmail\sendmail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__["a" /* EmailComposer */]])
    ], SendmailPage);
    return SendmailPage;
}());

//# sourceMappingURL=sendmail.js.map

/***/ }),

/***/ 843:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_map_map__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_geofence_geofence__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_chats_chats__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_Firebase__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_all_users_all_users__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_user_user__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_chat_chat__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, menu, userservice, events, chatservice) {
        var _this = this;
        this.userservice = userservice;
        this.events = events;
        this.chatservice = chatservice;
        this.rootPage = 'LoginPage';
        this.show = new Array();
        this.test = 'man';
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.platform = platform;
        this.menu = menu;
        console.log('le menu est charge');
        events.subscribe('test', function (role, time) {
            // user role and time are the same arguments passed in `events.publish(role, time)`
            console.log('Welcome', role, 'at', time);
            _this.role = role;
        });
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], icon: 'home', see: this.show[0] },
            { title: 'Géolocalisation', component: __WEBPACK_IMPORTED_MODULE_5__pages_map_map__["a" /* MapPage */], icon: 'map', see: this.show[1] },
            { title: 'Géo-Réperage', component: __WEBPACK_IMPORTED_MODULE_6__pages_geofence_geofence__["a" /* GeofencePage */], icon: 'md-pin', see: this.show[2] },
            { title: 'Chat Message', component: __WEBPACK_IMPORTED_MODULE_7__pages_chats_chats__["a" /* ChatsPage */], icon: 'swap', see: this.show[3] },
        ];
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        }); // End platform ready !
    } // End Constructor
    MyApp.prototype.ionViewDidLoad = function () {
    };
    MyApp.prototype.openPage = function (page) {
        this.menu.close();
        this.nav.push(page.component);
    };
    MyApp.prototype.openPageManage = function () {
        this.menu.close();
        this.nav.push(__WEBPACK_IMPORTED_MODULE_9__pages_all_users_all_users__["a" /* AllUsersPage */]);
    };
    MyApp.prototype.openPageHomePage = function () {
        this.menu.close();
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
    };
    ;
    MyApp.prototype.openPageMapPage = function () {
        this.menu.close();
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__pages_map_map__["a" /* MapPage */]);
    };
    ;
    MyApp.prototype.openPageGeofencePage = function () {
        this.menu.close();
        this.nav.push(__WEBPACK_IMPORTED_MODULE_6__pages_geofence_geofence__["a" /* GeofencePage */]);
    };
    ;
    MyApp.prototype.openPageChatsPage = function () {
        this.menu.close();
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__pages_chats_chats__["a" /* ChatsPage */]);
    };
    ;
    MyApp.prototype.logout = function () {
        var _this = this;
        this.chatservice.setStatusOffline().then(function (res) {
            if (res) {
                __WEBPACK_IMPORTED_MODULE_8_Firebase__["auth"]().signOut().then(function () {
                    _this.nav.setRoot('LoginPage');
                });
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\appp\fyves-sap-final\src\app\app.html"*/'<ion-menu id="leftMenu" [content]="content" type="overlay">\n\n	<ion-header>\n\n		<ion-toolbar>\n\n			<ion-title>Menu</ion-title>\n\n		</ion-toolbar>\n\n	</ion-header>\n\n\n\n<ion-content>\n\n		\n\n	 <!--\n\n		<ion-list>\n\n		<ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n			<ion-icon color="primary"  [name]="p.icon" item-left></ion-icon>\n\n			{{p.title}}\n\n		</ion-item>\n\n       \n\n		<ion-list-header *ngIf="auth.getEmail()">{{auth.getEmail()}}</ion-list-header>\n\n\n\n		<ion-item (click)="logout()" *ngIf="auth.authenticated">\n\n			<ion-icon color="primary" name="log-out" item-left></ion-icon>\n\n			Log out\n\n		</ion-item>\n\n\n\n		<ion-item (click)="login()" *ngIf="!auth.authenticated">\n\n			<ion-icon  color="primary" name="log-in" item-left></ion-icon>\n\n			Log in\n\n		</ion-item>\n\n		\n\n		-->\n\n	<ion-list>\n\n		<ion-item (click)="openPageHomePage()">\n\n			<ion-icon color="primary"  name= "home" item-left></ion-icon>\n\n			Home\n\n		</ion-item>\n\n		<ion-item (click)="openPageMapPage()">\n\n			<ion-icon color="primary"  name= "map" item-left></ion-icon>\n\n			Géolocalisation\n\n		</ion-item>\n\n		<ion-item *ngIf="role == \'Superviseur\' ||role == \'Administrateur\'" (click)="openPageGeofencePage()">\n\n			<ion-icon color="primary"  name= "md-pin" item-left></ion-icon>\n\n			Géo-Réperage\n\n		</ion-item>\n\n		<ion-item (click)="openPageChatsPage()">\n\n			<ion-icon color="primary"  name= "swap" item-left></ion-icon>\n\n			Chat Message\n\n		</ion-item>\n\n    </ion-list>\n\n    <button ion-button *ngIf="role == \'Superviseur\' ||role == \'Administrateur\'"  full (click)="openPageManage()">manage users <ion-icon name="md-people"></ion-icon>\n\n	</button>\n\n    <div>\n\n		<button ion-button round  color="primary"  (click)="logout()">LOGOUT</button>\n\n	</div>\n\n</ion-content>\n\n\n\n\n\n\n\n\n\n\n\n</ion-menu>\n\n\n\n\n\n\n\n\n\n<ion-nav id="nav" [root]="rootPage" #content swipe-back-enabled="true"></ion-nav>\n\n'/*ion-inline-end:"C:\appp\fyves-sap-final\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */], __WEBPACK_IMPORTED_MODULE_10__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_11__providers_chat_chat__["a" /* ChatProvider */]])
    ], MyApp);
    return MyApp;
}()); // End Class

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 844:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config; });
var config = {
    apiKey: "AIzaSyD8MRhdUhjn1D5rofhocK9ETj-HDHBGRsM",
    authDomain: "fyves-sap-c656c.firebaseapp.com",
    databaseURL: "https://fyves-sap-c656c.firebaseio.com/",
    projectId: "fyves-sap-c656c",
    storageBucket: "gs://fyves-sap-c656c.appspot.com",
    messagingSenderId: "971285179870"
};
//# sourceMappingURL=app.angularfireconfig.js.map

/***/ }),

/***/ 845:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InAppBrowserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var InAppBrowserService = /** @class */ (function () {
    function InAppBrowserService() {
    }
    InAppBrowserService.prototype.open = function (url) {
        window.open(url, '_system', 'location=yes');
        return false;
    };
    InAppBrowserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], InAppBrowserService);
    return InAppBrowserService;
}());

//# sourceMappingURL=in-app-browser.service.js.map

/***/ }),

/***/ 846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var TokenProvider = /** @class */ (function () {
    function TokenProvider() {
        this.fireusers = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/users');
        console.log('Hello ChatProvider Provider');
    }
    TokenProvider.prototype.addToken = function (token) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.fireusers.child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid + '/notificationTokens/').set({
                notificationToken: token
            })
                .then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    TokenProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], TokenProvider);
    return TokenProvider;
}());

//# sourceMappingURL=token.js.map

/***/ })

},[454]);
//# sourceMappingURL=main.js.map