import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { Album } from '../models/albums.model';
import { Track } from '../models/tracks.model';
import { MusicServiceService } from '../service/music-service';

@Component({
  selector: 'app-create-album',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-album.html',
  styleUrl: './create-album.css'
})
export class CreateAlbum implements OnInit {
  album: Album = new Album(0, '', '', '', '', '', []);
  artists: string[] = ['The Beatles', 'Pink Floyd', 'Led Zeppelin'];

  constructor(
    private service: MusicServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    // Generate next album ID
    let maxId = 0;
    for (let album of this.service.albums) {
      if (album.id > maxId) {
        maxId = album.id;
      }
    }
    this.album.id = maxId + 1;
  }

  onSubmit() {
    console.log('Creating album:', this.album);
    this.service.createAlbum(this.album);
    alert('Album created successfully!');
    this.router.navigate(['list-artists']);
  }
}
