import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-ragister',
  templateUrl: 'ragister.html',
})
export class RagisterPage {
  newuser = {email:'',username:'',password:'',cnfpassword:'',role:'',phone:''}
  email:AbstractControl;
  username:AbstractControl;
  password:AbstractControl;
  cnfpass:AbstractControl;
  name:any;

  authForm : FormGroup;
  passwordtype:string='password';
  cnfpasswordtype:string='password';
  cnfpasseye:string='eye';
  passeye:string ='eye';
  role: AbstractControl;
  phone: AbstractControl;
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService: UserProvider,public loadingCtrl: LoadingController,public toastCtrl : ToastController ,public fb: FormBuilder) {
    this.authForm = this.fb.group({
      'username' : [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required])],
      'phone': [null, Validators.compose([Validators.required])],
      'role': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'cnfpass': [null, Validators.compose([Validators.required])]
    });
    this.username = this.authForm.controls['username'];
    this.email = this.authForm.controls['email'];
    this.phone = this.authForm.controls['phone'];
    this.role = this.authForm.controls['role'];
    this.password = this.authForm.controls['password'];
    this.cnfpass = this.authForm.controls['cnfpass'];

    this.name = navParams.get('a');
    console.log(this.name);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RagisterPage');
    console.log(this.name);
  }
  doSignup(){

    let toaster = this.toastCtrl.create({
      message: 'Error Code',
      duration:3000,
      position:'bottom'
    });
    if(this.newuser.email == '' || this.newuser.password == '' || this.newuser.username == ''|| this.newuser.role == ''|| this.newuser.phone == ''){
      toaster.setMessage('All field are Required!');
      toaster.present();
    }else if(this.newuser.password.length < 7){
      toaster.setMessage('Password is Not Strong');
      toaster.present();
    }else{
      if(this.newuser.password == this.newuser.cnfpassword){

        let loader = this.loadingCtrl.create({
          content:'Please wait'
        })
        loader.present();
          this.userService.adduser(this.newuser).then((res)=>{
            loader.dismiss();
            if(res){
              this.navCtrl.push('ProfilepicPage');
            }else{
              alert('Error' + res);
            }
          })
        }else{
          toaster.setMessage('Both Password not matched');
          toaster.present();
        }
      }
  }

  
  doLogin(){
    this.navCtrl.setRoot('LoginPage');
  }
  managePassword() {
    if(this.passwordtype == 'password'){
      this.passwordtype='text';
      this.passeye='eye-off';
    }else{
      this.passwordtype='password';
      this.passeye = 'eye';
    }
  }
  managecnfPassword() {
    if(this.cnfpasswordtype == 'password'){
      this.cnfpasswordtype='text';
      this.cnfpasseye='eye-off';
    }else{
      this.cnfpasswordtype='password';
      this.cnfpasseye = 'eye';
    }
  }
}
