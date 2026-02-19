export class Track {
    id: number;
    number: string;
    title: string;
    lyrics: string;
    video: string;

    constructor(id: number, number: string, title: string, lyrics: string, video: string) {
        this.id = id;
        this.number = number;
        this.title = title;
        this.lyrics = lyrics;
        this.video = video;
    }
}