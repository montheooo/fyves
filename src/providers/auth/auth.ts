import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { usercreds } from '../../models/interfaces/usercreds';
import { UserProvider } from '../user/user';
import { UserInfo } from 'firebase/app';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthProvider {
  private user: firebase.User;
  role:string;

  constructor(private afireAuth:AngularFireAuth , public userservice: UserProvider) {
    console.log('Hello AuthProvider Provider');
    
  }
  login (credentials : usercreds){
    let promise = new Promise ((resolve, reject ) => {
      this.afireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(()=>{
        resolve(true)
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
    
  }

  getEmail() {
		return this.user && this.user.email;
	}
}
