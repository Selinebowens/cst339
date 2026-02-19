import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'musicapp';
  version = '1.0.0';

  constructor(private router: Router) {}

  displayVersion() {
    alert('Music App Version: ' + this.version);
  }

  displayArtistList() {
    this.router.navigate(['list-artists'], { queryParams: { data: new Date()} });
  }
}