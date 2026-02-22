import { Track } from "./tracks.model";

export class Album {
    albumId: number;
    artist: string;
    title: string;
    description: string;
    year: string | number;
    image: string;
    tracks: Track[];
    
    constructor(albumId: number, artist: string, title: string, description: string, year: string | number, image: string, tracks: Track[]) {
        this.albumId = albumId;
        this.artist = artist;
        this.title = title;
        this.description = description;
        this.year = year;
        this.image = image;
        this.tracks = tracks;
    }
}