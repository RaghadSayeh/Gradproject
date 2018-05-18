import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
//import {FirebaseListObservable } from 'angularfire2/database';
import { AngularFireDatabase} from 'angularfire2/database';
import { AddPage } from '../add/add';
import {EditPage} from '../edit/edit';
@IonicPage()
@Component({
  selector: 'page-editn',
  templateUrl: 'editn.html',
})
export class EditnPage {

  private note: any;
  //private toDoList: FirebaseListObservable<any>;
  //private tasks: FirebaseListObservable<any>;
  private task: any;

  @ViewChild('textArea') textArea;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public afDatabase:AngularFireDatabase) {
    this.note = navParams.get('note');
    //this.toDoList = this.afDatabase.list('/userTasks');
    //this.tasks = this.afDatabase.list('/userTasks/'+this.note.$key+'/task');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditnPage');
  }

  eventHandler(keyCode) {
    if (keyCode == 13) {
      this.textArea.setFocus();
    }
  }
  saveNote() {
    if (this.note.name != "") {
      //this.toDoList.update(this.note.$key, { "name": this.note.name, "description": this.note.description });
      this.showToast('Note edited successfully');
      this.navCtrl.pop();
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
  addTask(){
    this.navCtrl.push(AddPage,{note: this.note});
  }
  done(idTask, checked){
    //this.tasks.update(idTask,{checked: !checked});
    //this.tasks.forEach(task => {
      //  if (task.$key == idTask) {
        //  this.task = task;
          //this.task.checked = !checked;
        //}
  //  });
  }
  deleteTask(idTask){
    //this.tasks.remove(idTask);
    this.showToast('Task removed successfully');
  }

  editTask(task){
    this.navCtrl.push(EditPage,{note: this.note.$key, task: task});
  }

}
