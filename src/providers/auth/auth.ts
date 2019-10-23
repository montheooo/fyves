import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { usercreds } from '../../models/interfaces/usercreds';
import { UserProvider } from '../user/user';
import { UserInfo } from 'firebase/app';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthProvider {
 /* private user: firebase.User;
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
  
  getUserId() {
    return this.user && this.user.uid;
  }
}*/
private user: firebase.User;
public fcm2: any ;

constructor(public afAuth: AngularFireAuth) {
  
  afAuth.authState.subscribe(user => {
    this.user = user;
  //	this.fcm2 = fcm ;
  });
}

login (credentials : usercreds){
  let promise = new Promise ((resolve, reject ) => {
    this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(()=>{
      resolve(true)
    }).catch((err) => {
      reject(err);
    })
  })
  return promise;
  
}

signInWithEmail(credentials) {
  console.log('Sign in with email');
  return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
     credentials.password);
}

signUp(credentials) {
  return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password);
}

get authenticated(): boolean {
  return this.user !== null;
}


getEmail() {
  return this.user && this.user.email;
}

getUserId() {
  return this.user.uid ;
}

getName() {
  return this.user.displayName ;
}

signOut(): Promise<void> {
  return this.afAuth.auth.signOut();
}

/*signInWithGoogle() {
  console.log('Sign in with google');
  return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
} */


/*private oauthSignIn(provider: AuthProvider) {
  if (!(<any>window).cordova) {
    return this.afAuth.auth.signInWithPopup(provider);
  } else {
    return this.afAuth.auth.signInWithRedirect(provider)
    .then(() => {
      return this.afAuth.auth.getRedirectResult().then( result => {
        // This gives you a Google Access Token.
        // You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        console.log(token, user);
      }).catch(function(error) {
        // Handle Errors here.
        alert(error.message);
      });
    });
  }
}*/

}


