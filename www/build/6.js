webpackJsonp([6],{

/***/ 848:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuddychatPageModule", function() { return BuddychatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buddychat__ = __webpack_require__(857);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BuddychatPageModule = /** @class */ (function () {
    function BuddychatPageModule() {
    }
    BuddychatPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__buddychat__["a" /* BuddychatPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__buddychat__["a" /* BuddychatPage */]),
            ],
        })
    ], BuddychatPageModule);
    return BuddychatPageModule;
}());

//# sourceMappingURL=buddychat.module.js.map

/***/ }),

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuddychatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_imagehandler_imagehandler__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BuddychatPage = /** @class */ (function () {
    function BuddychatPage(navCtrl, navParams, chatservice, events, zone, loadingCtrl, imgstore) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chatservice = chatservice;
        this.events = events;
        this.zone = zone;
        this.loadingCtrl = loadingCtrl;
        this.imgstore = imgstore;
        this.allmessages = [];
        this.buddy = this.chatservice.buddy;
        // this.photoURL = firebase.auth().currentUser.photoURL;
        this.scrollto();
        this.events.subscribe('newmessage', function () {
            _this.allmessages = [];
            _this.imgornot = [];
            _this.zone.run(function () {
                _this.allmessages = _this.chatservice.buddymessages;
                for (var key in _this.allmessages) {
                    if (_this.allmessages[key].message.substring(0, 4) == 'http')
                        _this.imgornot.push(true);
                    else
                        _this.imgornot.push(false);
                }
            });
        });
        this.events.subscribe('onlieStatus', function () {
            _this.zone.run(function () {
                _this.buddyStatus = _this.chatservice.buddyStatus;
            });
        });
    }
    BuddychatPage.prototype.ionViewDidEnter = function () {
        this.chatservice.getbuddymessages();
        this.chatservice.getbuddyStatus();
    };
    BuddychatPage.prototype.addmessage = function () {
        var _this = this;
        this.chatservice.addnewmessage(this.newmessage).then(function () {
            _this.content.scrollToBottom();
            _this.newmessage = '';
        });
    };
    BuddychatPage.prototype.scrollto = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom();
        }, 1000);
    };
    BuddychatPage.prototype.sendPicMsg = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please wait'
        });
        loader.present();
        this.imgstore.picmsgstore().then(function (imgurl) {
            loader.dismiss();
            _this.chatservice.addnewmessage(imgurl).then(function () {
                _this.scrollto();
                _this.newmessage = '';
            });
        }).catch(function (err) {
            alert(err);
            loader.dismiss();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], BuddychatPage.prototype, "content", void 0);
    BuddychatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-buddychat',template:/*ion-inline-start:"C:\appp\fyves-sap-final\src\pages\buddychat\buddychat.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      <div class="user-icon"><img src="{{buddy.photoURL}}"></div>\n\n      {{buddy.displayName}}\n\n      <br><p class="statusclass">{{buddyStatus}}</p>\n\n    </ion-title>\n\n   </ion-navbar>\n\n </ion-header>\n\n <ion-content #content>\n\n <div class = "chatwindow">\n\n   <ion-list no-lines>\n\n     <ion-item *ngFor = "let item of allmessages; let i = index" text-wrap>\n\n       <!-- <ion-avatar item-left *ngIf="item.sentby === buddy.uid">\n\n         <img src="{{buddy.photoURL}}">\n\n       </ion-avatar> -->\n\n       <div class="bubble me" *ngIf="item.sentby === buddy.uid">\n\n         <h3 *ngIf="!imgornot[i]">{{item.message}}</h3>\n\n         <img src="{{item.message}}" *ngIf="imgornot[i]">\n\n         <div class="msg-time">{{item.timeofmsg}}</div>\n\n       </div>\n\n       <!-- <ion-avatar item-right *ngIf="item.sentby != buddy.uid">\n\n         <img src="{{photoURL}}">\n\n       </ion-avatar> -->\n\n       <div class="bubble you" *ngIf="item.sentby != buddy.uid">\n\n         <h3 *ngIf="!imgornot[i]">{{item.message}}</h3>\n\n         <img src="{{item.message}}" *ngIf="imgornot[i]">\n\n         <div class="msg-time">{{item.timeofmsg}}</div>\n\n       </div>\n\n     </ion-item>\n\n   </ion-list>\n\n </div>\n\n </ion-content>\n\n <ion-footer ion-fixed>\n\n   <form>\n\n   <ion-toolbar class="no-border" color="white">\n\n     <ion-input [(ngModel)]="newmessage" name= "newmessage" class="newmsg" placeholder="Ecrire votre message ..."></ion-input>\n\n     <ion-buttons end>\n\n       <button ion-button (click)="sendPicMsg()"><ion-icon class="camera-btn" name="camera"></ion-icon></button>\n\n     </ion-buttons>\n\n     <ion-buttons end>\n\n       <button ion-button round type="submit" class="sentbtn" (click)="addmessage()"><ion-icon name="send" color="primary" style="font-size: 2.2em;"></ion-icon></button>\n\n     </ion-buttons>\n\n    </ion-toolbar>\n\n  </form>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\appp\fyves-sap-final\src\pages\buddychat\buddychat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__["a" /* ChatProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_imagehandler_imagehandler__["a" /* ImagehandlerProvider */]])
    ], BuddychatPage);
    return BuddychatPage;
}());

//# sourceMappingURL=buddychat.js.map

/***/ })

});
//# sourceMappingURL=6.js.map