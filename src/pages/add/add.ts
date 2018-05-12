import { Component ,Input,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { AngularFireDatabase,} from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  public itemText: String;
  public itemChecked: boolean;
  public itemDate: String;
  private currentDate: String;
  private note: any;
  private id: String;
  private toDoList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase,private toastCtrl: ToastController) {
    this.note = navParams.get('note');
    this.toDoList = this.afDatabase.list('/userTasks/'+this.note.$key+'/task');
    this.itemDate = "";
    this.itemText = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  saveTask() {
    if (this.itemText != "") {

      if (this.itemDate == "") {
        this.itemDate = "No date";
      }
      this.toDoList.push({
        text:this.itemText,
        date:this.itemDate,
        checked: false
      });
   
      this.itemText = "";
      this.itemDate = null;
      this.presentToast('Task added successfully');
    }else{
      this.presentToast('Task must have text');
    }
  }

  presentToast(msj) {
    let toast = this.toastCtrl.create({
      message: msj,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidEnter() {
    this.currentDate = new Date().toISOString();
  }

  eventHandler(keyCode) {
    if (keyCode == 13) {
      //Pasar el focus al datetime
    }
  }

  generateId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

}
