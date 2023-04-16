import { Component } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {

  arr=[1,2,3,4,5,6];
  months = ["January","Febraury","March","April","May","June","July","August","Septemper","October","November","December"];
  divFlag:Boolean = false;
  num:Number =0;
  month = new Date().getMonth();
 classFlag:Boolean = true;
 class1:string = "bg-primary";
 class2:string = "bg-secondary"
 textBlue = "blue";
bggrey = "grey";
}
