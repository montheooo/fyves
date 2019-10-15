import { IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component } from '@angular/core';
import { UserInfo } from 'firebase/app';

/**
 * Generated class for the AllUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-users',
  templateUrl: 'all-users.html',
})
export class AllUsersPage {

  users : Array<UserInfo>;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService: UserProvider,public loadingCtrl: LoadingController,public toastCtrl : ToastController ,public fb: FormBuilder) {
   
    this.userService.getallusers().then((allusers:Array<UserInfo>)=>{
       this.users=allusers;
       console.log(this.users);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RagisterPage');
  }
  
  doSignup(){
    this.navCtrl.push('RagisterPage');
  }
}
