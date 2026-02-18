import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfoComponent } from '../info/info';

@Component({
  selector: 'app-shop',
  imports: [ReactiveFormsModule, CommonModule, InfoComponent],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class ShopComponent {
  question = "What's your name?";
  answer = "unknown";
  
  appForm = new FormGroup({
    answer: new FormControl(''),
  });
  
  onSubmit(data: Partial<{ answer: string | null }>) {
    this.answer = data.answer!;
    console.log("Your name is " + this.answer);
  }
}