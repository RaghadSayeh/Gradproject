import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

/*
  Generated class for the UsersserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersserviceProvider {
  public data: any;
  public fireAuth: any;
  public userProfile: any;
  public forCont: any;
  public forEvent: any;

  constructor(public http: HttpClient) {
    this.fireAuth = firebase.auth();

    this.userProfile = firebase.database().ref('users');

    this.forCont=firebase.database().ref('conts');
  }
  loginUserService(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signupUserService(account: {}){

    
    return this.fireAuth.createUserWithEmailAndPassword(account['email'], account['password']).then((newUser) => {
      //sign in the user
      this.fireAuth.signInWithEmailAndPassword(account['email'], account['password']).then((authenticatedUser) => {
        //successful login, create user profile
      this.userProfile.child(authenticatedUser.uid).set(
        account
      );
      });
    });

}

contUserService(account1:{}){
  return  this.fireAuth.signInWithEmailAndPassword(account1['Yemail'], account1['password']).then((authenticatedUser) => {
    //successful login, create user profile
     this.forCont.child(authenticatedUser.uid).set(
    account1
  );
});

}
writeEventInfo(account2:{}){
     this.forEvent=firebase.database().ref('eventInfo');
 return this.forEvent.push({
    account2
  });
}

logoutService(){
  return firebase.auth().signOut().then(function(){
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });
  }

}
