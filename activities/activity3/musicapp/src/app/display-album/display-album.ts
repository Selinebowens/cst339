import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Album } from '../models/albums.model';

@Component({
  selector: 'app-display-album',
  imports: [CommonModule, RouterLink],
  templateUrl: './display-album.html',
  styleUrl: './display-album.css'
})
export class DisplayAlbum {
  @Input() album!: Album;
}
