import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [
    {
      title: "product Title 1",
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
