import React, { useState } from 'react';
import Card from './Card';
import './App.css';

const App = () => {
    const [albumList, setAlbumList] = useState([
        {
            artistId: 0,
            artist: 'The Beatles',
            title: 'Yellow Submarine',
            description: 'Yellow Submarine is the tenth studio album by English rock band the Beatles, released on 13 January 1969 in the United States and on 17 January 1969 in the United Kingdom.',
            year: 1969,
            image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/TheBeatles-YellowSubmarinealbumcover.jpg/220px-TheBeatles-YellowSubmarinealbumcover.jpg',
        },
        {
            artistId: 1,
            artist: 'The Beatles',
            title: 'Abbey Road',
            description: 'Abbey Road is the eleventh studio album by English rock band the Beatles, released on 26 September 1969 by Apple Records.',
            year: 1969,
            image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Beatles_-_Abbey_Road.jpg/220px-Beatles_-_Abbey_Road.jpg',
        },
        {
            artistId: 2,
            artist: 'The Beatles',
            title: 'Let It Be',
            description: "Let It Be is the twelfth and final studio album by the English rock band the Beatles. It was released on 8 May 1970, almost a month after the group's break-up.",
            year: 1970,
            image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/25/LetItBe.jpg/220px-LetItBe.jpg',
        },
    ]);

    const renderedList = () => {
        return albumList.map((album) => {
            return (
                <Card
                    albumTitle={album.title}
                    albumDescription={album.description}
                    buttonText='OK'
                    imgURL={album.image}
                />
            );
        });
    };

    return <div className='container'>{renderedList()}</div>;
};

export default App;