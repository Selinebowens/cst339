import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artists.model';
import { Album } from '../models/albums.model';

@Injectable({
  providedIn: 'root'
})
export class MusicServiceService {

  // Backend API URL
  private host = "http://localhost:5000";

  constructor(private http: HttpClient) {
    console.log('Music Service initialized with backend API');
  }

  // Get list of all artists with callback
  public getArtists(callback: (artists: Artist[]) => void): void {
    this.http.get<Artist[]>(this.host + "/artists").
      subscribe((artists: Artist[]) => {
        callback(artists);
      });
  }

  // Get all albums with callback
  public getAlbums(callback: (albums: Album[]) => void): void {
    this.http.get<Album[]>(this.host + "/albums").
      subscribe((albums: Album[]) => {
        callback(albums);
      });
  }

  // Get albums by artist with callback
  public getAlbumsOfArtist(artistName: string, callback: (albums: Album[]) => void): void {
    let request = this.host + `/albums/${artistName}`;
    console.log('request', request);
    this.http.get<Album[]>(request).
      subscribe((albums: Album[]) => {
        console.log('have albums', albums);
        callback(albums);
      });
  }

  // Create a new album with callback
  public createAlbum(album: Album, callback: () => void): void {
    this.http.post<Album>(this.host + "/albums", album)
      .subscribe((data) => {
        callback();
      });
  }

  // Update an existing album with callback
  public updateAlbum(album: Album, callback: () => void): void {
    this.http.put<Album>(this.host + "/albums", album)
      .subscribe((data) => {
        callback();
      });
  }

  // Delete an album with callback
  public deleteAlbum(id: number, callback: () => void): void {
    this.http.delete(this.host + "/albums/" + id)
      .subscribe((data) => {
        callback();
      });
  }
}