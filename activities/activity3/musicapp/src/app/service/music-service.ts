/**
 * Music Service
 * 
 * This service acts as a design pattern for managing music data in the application.
 * It provides a centralized location for all CRUD operations
 * on albums and artists. By using a service, we separate data management logic from 
 * component logic, making the code more maintainable and testable.
 */

import { Injectable } from '@angular/core';
import { Artist } from '../models/artists.model';
import { Album } from '../models/albums.model';
import * as exampledata from '../data/sample-music-data.json';

/**
 * @Injectable decorator
 * 
 * This decorator marks the class as available for dependency injection.
 * 'providedIn: root' means Angular will create a single instance of this service
 * and share it across the entire application (singleton pattern).
 * This ensures all components access the same data.
 */
@Injectable({
  providedIn: 'root'
})
export class MusicServiceService {

  /**
   * albums: Album[]
   * 
   * This property holds all album data loaded from the JSON file.
   * The data is stored in memory as an array of Album objects.
   * 
   * (exampledata as any).default || exampledata:
   * - Tries to access .default first (for some TypeScript module systems)
   * - Falls back to exampledata directly if .default doesn't exist
   * - This handles different ways TypeScript might import JSON files
   */
  albums: Album[] = (exampledata as any).default || exampledata;

  /**
   * Constructor
   * 
   * Angular calls this when creating the service instance.
   * Console logs help verify the service initialized correctly
   * and data loaded successfully during development.
   */
  constructor() { 
    console.log('Music Service initialized');
    console.log('Albums loaded:', this.albums);
  }

  /**
   * getArtists()
   * 
   * PURPOSE: Extracts a unique list of all artists from the albums array.
   * 
   * WHY THIS APPROACH:
   * - Multiple albums can have the same artist
   * - We need to eliminate duplicates to show each artist only once
   * - The find() method searches for existing artists efficiently
   */
  getArtists(): Artist[] {
    // Initialize empty array to store unique artists
    let artists: Artist[] = [];
    
    // Loop through all albums in the collection
    for (let album of this.albums) {
      // Create a new Artist object from the album's artist name
      let artist = new Artist(album.artist);
      
      // Check if this artist already exists in our results array
      // find() returns the first matching element, or undefined if not found
      if (!artists.find(a => a.artist === artist.artist)) {
        // Artist is unique, add it to the results
        artists.push(artist);
      }
    }
    
    // Return the array of unique artists
    return artists;
  }

  /**
   * getAlbumsOfArtist(artist: string)
   * 
   * PURPOSE: Retrieves all albums by a specific artist
   * 
   * USE CASE: When a user clicks on an artist, this method fetches
   * all albums by that artist to display in the album list.
   */
  getAlbumsOfArtist(artist: string): Album[] {
    // Initialize empty array for results
    let albums: Album[] = [];
    
    // Loop through all albums
    for (let album of this.albums) {
      // Check if this album's artist matches the search parameter
      if (album.artist === artist) {
        // Match found, add to results
        albums.push(album);
      }
    }
    
    // Return all matching albums
    return albums;
  }

  /**
   * getAlbum(artist: string, id: number)
   * 
   * PURPOSE: Retrieves a specific album by artist name and album ID
   * 
   * PARAMETERS:
   * @param artist - The artist name to search for
   * @param id - The unique album ID number
   * 
   * WHY TWO PARAMETERS:
   * - Album IDs might not be globally unique across all artists
   * - Requiring both artist and ID ensures we get the exact album
   */
  getAlbum(artist: string, id: number): Album | null {
    // Loop through all albums
    for (let album of this.albums) {
      // Check if both artist AND id match
      if (album.artist === artist && album.id === id) {
        // Match found, return this album immediately
        return album;
      }
    }
    // No match found after checking all albums
    return null;
  }

  /**
   * createAlbum(album: Album)
   * 
   * PURPOSE: Adds a new album to the collection
   * 
   * PARAMETERS:
   * @param album - Complete Album object to add (must include all required fields)
   */
  createAlbum(album: Album): number {
    try {
      // Add the new album to the end of the albums array
      this.albums.push(album);
      // Return the album's ID to indicate success
      return album.id;
    } catch (error) {
      // If any error occurs, return -1 to indicate failure
      return -1;
    }
  }

  /**
   * updateAlbum(album: Album)
   * 
   * PURPOSE: Updates an existing album with new information
   * 
   * PARAMETERS:
   * @param album - Album object with updated data (must include ID)
   */
  updateAlbum(album: Album): number {
    // Loop with index so we know where to splice
    for (let i = 0; i < this.albums.length; i++) {
      // Check if this album's ID matches
      if (this.albums[i].id === album.id) {
        // Found it! Replace the old album with the new one
        // splice(position, deleteCount, newItem)
        this.albums.splice(i, 1, album);
        // Return 0 to indicate success
        return 0;
      }
    }
    // Album not found, return -1 to indicate failure
    return -1;
  }

  /**
   * deleteAlbum(id: number, artist: string)
   * 
   * PURPOSE: Removes an album from the collection
   * 
   * PARAMETERS:
   * @param id - The unique ID of the album to delete
   * @param artist - The artist name (for additional verification)
   * 
   * WHY BOTH ID AND ARTIST:
   * - Extra safety check to ensure we're deleting the right album
   * - Prevents accidental deletion if IDs somehow overlap
   * - Follows defensive programming practices
   */
  deleteAlbum(id: number, artist: string): number {
    // Loop through albums with index
    for (let i = 0; i < this.albums.length; i++) {
      // Check if both ID and artist match
      if (this.albums[i].id === id && this.albums[i].artist === artist) {
        // Match found, remove this album from the array
        // splice(position, deleteCount)
        this.albums.splice(i, 1);
        // Return 0 to indicate successful deletion
        return 0;
      }
    }
    // Album not found, return -1 to indicate failure
    return -1;
  }
}

