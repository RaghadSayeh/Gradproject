import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class UsersserviceProvider {
  public data: any;
  public fireAuth: any;
  public userProfile: any;
  public forCont: any;
  public forEvent: any;
  
  NAME;
  EMAIL;
  DESC;
  TYPE;
  DAY;
  MONTH;
  YEAR;
  TIME;
  CITY;
  LOCATION;
  PHOTO;
  PAID;
  PRICE;
  MANNO;

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
/*

NAME;
  EMAIL;
  DESC;
  TYPE;
  DAY;
  MONTH;
  YEAR;
  TIME;
  CITY;
  LOCATION;
  PHOTO;
  PAID;
  PRICE;
  MANNO;
*/
  setName(name){
    this.NAME=name;
    //this.PAID=paid;
  }

  getName(){
    return this.NAME;
  }
  setEmail(email){
    this.EMAIL=email;
  }
  getEmail(){
return this.EMAIL;
  }

  setDesc(desc){
    this.DESC=desc;
  }
  getDesc(){
return this.DESC;
  }
 setType(type){
    this.TYPE=type;
  }
  getType(){
return this.TYPE;
  }

  setDay(day){
    this.DAY=day;
  }
  getDay(){
return this.DAY;
  }

  setMonth(month){
    this.MONTH=month;
  }
  getMonth(){
return this.MONTH;
  }

  setYear(year){
    this.YEAR=year;
  }
  getYear(){
return this.YEAR;
  }

  setTime(time){
    this.TIME=time;
  }
  getTime(){
return this.TIME;
  }
  setCity(city){
    this.CITY=city;
  }
  getCity(){
return this.CITY;
  }
  setLocation(location){
    this.LOCATION=location;
  }
  getLocation(){
return this.LOCATION;
  }
  setPhoto(photo){
    this.PHOTO=photo;
  }
  getPhoto(){
return this.PHOTO;
  }

  setPrice(price){
    this.PRICE=price;
  }
  getPrice(){
return this.PRICE;
  }
  setMaxNo(maxnumber){
    this.MANNO=maxnumber;
  }
  getMaxNo(){
return this.MANNO;
  }
}
