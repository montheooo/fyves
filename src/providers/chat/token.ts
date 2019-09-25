import { Injectable } from '@angular/core';
import firebase from 'firebase';





/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TokenProvider {
  fireusers = firebase.database().ref('/users');

    
  constructor() {
    console.log('Hello ChatProvider Provider');
    
  }
  

  
  addToken(token){
      var promise = new Promise((resolve, reject)=> {
          this.fireusers.child(firebase.auth().currentUser.uid + '/notificationTokens/').set({
            notificationToken: token 
          })
          .then(()=>{
            resolve(true);
          }).catch((err)=>{
            reject(err);
          })
      })
      return promise;
  }
 
  
  
}
