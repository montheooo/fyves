import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';


/**
 * Generated class for the SendmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendmail',
  templateUrl: 'sendmail.html',
})
export class SendmailPage {
  Subject='';
  body='';
  to='simopatrice415@gmail.com';
  constructor(public navCtrl: NavController, public navParams: NavParams, public emailComposer:EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendmailPage');
  }

  send(){
 let email = {
to:this.to,
cc:[],
bcc:[],
attachment:[],
subject:this.body,
body:this.body,
isHtml:false,
app:"Gmail"
 }
 this.emailComposer.open(email);
  }
}
