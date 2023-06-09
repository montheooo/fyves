import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from 'firebase/app';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/users');
  uid: BehaviorSubject<string> = new BehaviorSubject<string>( '' );
  constructor(private afireAuth:AngularFireAuth) {
    console.log('Hello UserProvider Provider');
    
  }
  adduser(newuser){
    var promise = new Promise((resolve , reject) => {
        this.afireAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(()=>{
          this.afireAuth.auth.currentUser.updateProfile({
             displayName: newuser.username,
             photoURL: 'https://www.limestone.edu/sites/default/files/user.png'
          }).then(() => {
            this.firedata.child(this.afireAuth.auth.currentUser.uid).set({
              uid:this.afireAuth.auth.currentUser.uid,
              displayName: newuser.username,
              phone:newuser.phone, 
              role:newuser.role,
              photoURL:'https://www.limestone.edu/sites/default/files/user.png'
            }).then(()=>{
              resolve(true);
            }).catch((err)=>{
              reject(err);
            })
          }).catch((err)=>{
            reject(err);
          })
        }).catch((err)=>{
          reject(err);
        })
    })
    return promise
  }
  updateimage(imageurl) {
      var promise = new Promise((resolve, reject) => {
          this.afireAuth.auth.currentUser.updateProfile({
              displayName: this.afireAuth.auth.currentUser.displayName,
              photoURL: imageurl
          }).then(() => {
            this.firedata.child(this.afireAuth.auth.currentUser.uid).update({photoURL:imageurl}).then(() => {
              firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
              displayName: this.afireAuth.auth.currentUser.displayName,
              photoURL: imageurl,
              uid: firebase.auth().currentUser.uid
              }).then(() => {
                  resolve({ success: true });
                  }).catch((err) => {
                      reject(err);
                  })
            })
          }).catch((err) => {
                reject(err);
             })
      })
      return promise;
  }
  getuserdetails(){
     let promise = new Promise((resolve , reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
          resolve(snapshot.val());
      }).catch((err) => {
            reject(err);
      })
    })
    return promise;
  }
  updatedisplayname(newname,newphone?,newrole?) {
      var promise = new Promise((resolve, reject) => {
        this.afireAuth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL: this.afireAuth.auth.currentUser.photoURL
      }).then(() => {
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: newname,
          photoURL: this.afireAuth.auth.currentUser.photoURL,
          uid: this.afireAuth.auth.currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
        }).catch((err) => {
          reject(err);
      })
      })
      return promise;
  }

  deleteUser(uid){
    this.firedata.child(uid).remove();
  }

  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
}
