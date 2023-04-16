import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
 posts = [
  {
    title: "post Title 1",
    body: "BODY CONTENTTTTTTTTT 1"
   },
   {
    title: "post Title 2",
    body: "BODY CONTENTTTTTTTTT 2"
   },
   {
    title: "post Title 3",
    body: "BODY CONTENTTTTTTTTT 3"
   },
   {
    title: "post Title 4",
    body: "BODY CONTENTTTTTTTTT 4"
   }
]

}
