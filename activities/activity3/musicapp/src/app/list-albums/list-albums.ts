import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artist } from '../models/artists.model';
import { Album } from '../models/albums.model';
import { MusicServiceService } from '../service/music-service';
import { DisplayAlbum } from '../display-album/display-album';

@Component({
  selector: 'app-list-albums',
  imports: [CommonModule, DisplayAlbum],
  templateUrl: './list-albums.html',
  styleUrl: './list-albums.css'
})
export class ListAlbums implements OnInit {
  @Input() artist!: Artist;
  albums: Album[] = [];
  selectedAlbum: Album | null = null;

  constructor(private service: MusicServiceService) {}

  ngOnInit() {
    this.albums = this.service.getAlbumsOfArtist(this.artist!.artist);
  }

  onSelectAlbum(album: Album) {
    this.selectedAlbum = album;
  }
}
