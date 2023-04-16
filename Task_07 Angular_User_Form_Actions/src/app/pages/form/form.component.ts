import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
@Output() sendingUserData = new EventEmitter<any>();

userData = {
  username:"",
  email:""
}

handleClick(){
const obj = {
  username:this.userData.username,
  email:this.userData.email
}
this.sendingUserData.emit(obj);
}
}
