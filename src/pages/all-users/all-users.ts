import { IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component } from '@angular/core';
import { UserInfo } from 'firebase/app';
import { AlertController } from 'ionic-angular';

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
 
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService: UserProvider,public loadingCtrl: LoadingController,public toastCtrl : ToastController ,public fb: FormBuilder,public alertCtrl: AlertController) {
   
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

  openRegister(event,u){
    this.navCtrl.push('RagisterPage', 
      {
        a:u
        })
  }

  showConfirm(uid) {
    console.log(uid);
    const confirm = this.alertCtrl.create({
      title: 'supprimer un utilisateur',
      message: 'voulez vous vraiment suprimer cet utilisateur ainsi que toutes ses informations?',
      buttons: [
        {
          text: 'annuler',
          handler: () => {
            console.log('supression annule');
          }
        },
        {
          text: 'suprimer',
          handler: () => {
            this.userService.deleteUser(uid);
            this.ionViewDidLoad();
          }
        }
      ]
    });
    confirm.present();
  }
}

