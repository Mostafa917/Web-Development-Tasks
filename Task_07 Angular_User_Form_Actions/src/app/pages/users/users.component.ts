import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
users :any=[];
handleUser(eve:any){
  this.users.push(eve);
}
deleteUser(i:any){
  this.users.splice(i,1);
}

editUser(user:any){
user.email = prompt("Enter Email");
}
}

