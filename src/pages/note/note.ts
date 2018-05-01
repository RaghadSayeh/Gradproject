import { Component , ViewChild,Input} from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AddPage } from '../add/add';
import {FirebaseListObservable} from 'angularFire2';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})
export class NotePage {
  private toDoList: FirebaseListObservable<any>;
  private itemText: String;
  private itemTextArea: String;
  @ViewChild('textArea') texArea;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,public afDatabse:AngularFireDatabase) {
    this.toDoList = this.afDatabse.list('/todos');
    this.itemText = "";
    this.itemTextArea = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotePage');
  }
  addNote(){
    if(this.itemText!=""){
      this.toDoList.push({"name": this.itemText, "description": this.itemTextArea, "task":""});
      this.navCtrl.pop();
      this.showToast('Note added successfully');
    }else{
      this.showToast('The note must have a title');
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

eventHandler(keyCode){
  if(keyCode == 13){
    this.texArea.setFocus();
  }
}


}
