import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Artist } from '../models/artists.model';
import { MusicServiceService } from '../service/music-service';
import { ListAlbums } from '../list-albums/list-albums';

@Component({
  selector: 'app-list-artists',
  imports: [CommonModule, ListAlbums],
  templateUrl: './list-artists.html',
  styleUrl: './list-artists.css'
})
export class ListArtists implements OnInit {
  selectedArtist: Artist | null = null;
  artists: Artist[] = [];

  constructor(
    private route: ActivatedRoute, 
    private service: MusicServiceService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log("Getting artists data...");
      this.artists = this.service.getArtists();
      console.log("Artists loaded:", this.artists);
      this.selectedArtist = null;
    });
  }

  onSelectArtist(artist: Artist) {
    this.selectedArtist = artist;
  }
}