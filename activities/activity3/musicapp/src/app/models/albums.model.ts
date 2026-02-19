import { Track } from "./tracks.model";

export class Album {
    id: number;
    artist: string;
    title: string;
    description: string;
    year: string;
    image: string;
    tracks: Track[];

    constructor(id: number, artist: string, title: string, description: string, year: string, image: string, tracks: Track[]) {
        this.id = id;
        this.artist = artist;
        this.title = title;
        this.description = description;
        this.year = year;
        this.image = image;
        this.tracks = tracks;
    }
}