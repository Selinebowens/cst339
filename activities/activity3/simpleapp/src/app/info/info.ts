import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-info',
  imports: [FormsModule, CommonModule],
  templateUrl: './info.html',
  styleUrl: './info.css'
})
export class InfoComponent implements OnInit {
  @Input() name: string = '';
  quantity = 0;
  products: string[] = [];
  selectedProduct = "Star Wars";
  
  constructor() { }
  
  ngOnInit() {
    this.quantity = 0;
    this.products = ["Star Wars", "The Empire Strikes Back", "Return of the Jedi"];
    this.selectedProduct = "Star Wars";
  }
  
  newInfo() {
    this.quantity = 0;
    this.products = ["Star Wars", "The Empire Strikes Back", "Return of the Jedi"];
    this.selectedProduct = "Star Wars";
    console.log("In newInfo() and resetting Info");
  }
  
  onSubmit() {
    console.log("In onSubmit() with quantity of " + this.quantity + " and Movie selected is " + this.selectedProduct);
  }
}