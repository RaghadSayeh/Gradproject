import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import {FirebaseListObservable} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  private task: any;
  private toDoList: FirebaseListObservable<any>;
  private noteKey: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,public afDatabase: AngularFireDatabase) {
    this.task = navParams.get('task');
    this.noteKey = navParams.get('note');
    this.toDoList = this.afDatabase.list('/userTasks/'+this.noteKey+'/task');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }
  save(){
    if(this.task.text != ""){
      this.toDoList.update(this.task.$key,{text: this.task.text, date: this.task.date});
      this.showToast('Task edited successfully');
      this.navCtrl.pop();
    }else{
      this.showToast('Task must have text');
    }
  }

  showToast(msj) {
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
}
