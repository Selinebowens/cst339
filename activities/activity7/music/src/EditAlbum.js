import React, { useState } from 'react';
import dataSource from './dataSource';
import { useNavigate } from 'react-router-dom';

const EditAlbum = (props) => {
    // Assume New Album by default
    let album = {
        title: '',
        artist: '',
        description: '',
        year: '',
        image: '',
        tracks: [],
    };
    let newAlbumCreation = true;

    // If an album is provided in props, then we are editing
    if (props.album) {
        album = props.album;
        newAlbumCreation = false;
    }

    const [albumTitle, setAlbumTitle] = useState(album.title);
    const [artist, setArtist] = useState(album.artist);
    const [description, setDescription] = useState(album.description);
    const [year, setYear] = useState(album.year);
    const [image, setImage] = useState(album.image);
    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("submit");
        const editedAlbum = {
            albumId: album.albumId,
            title: albumTitle,
            artist: artist,
            description: description,
            year: year,
            image: image,
            tracks: [],
        };
        console.log(editedAlbum);
        saveAlbum(editedAlbum);
    };

    const saveAlbum = async (album) => {
        let response;
        if (newAlbumCreation)
            response = await dataSource.post('/albums', album);
        else
            response = await dataSource.put('/albums', album);
        console.log(response);
        console.log(response.data);
        props.onEditAlbum(navigate);
    };

    const handleCancel = () => {
        navigate("/");
    };

    const updateTitle = (event) => { setAlbumTitle(event.target.value); };
    const updateArtist = (event) => { setArtist(event.target.value); };
    const updateDescription = (event) => { setDescription(event.target.value); };
    const updateYear = (event) => { setYear(event.target.value); };
    const updateImage = (event) => { setImage(event.target.value); };

    return (
        <div className='container'>
            <form onSubmit={handleFormSubmit}>
                <h1>{newAlbumCreation ? "Create New" : "Edit"} Album</h1>
                <div className='form-group'>
                    <label htmlFor='albumTitle'>Album Title</label>
                    <input type='text' className='form-control' id='albumTitle' placeholder='Enter Album Title' value={albumTitle} onChange={updateTitle} />
                    <label htmlFor='albumArtist'>Artist</label>
                    <input type='text' className='form-control' id='albumArtist' placeholder='Enter Album Artist' value={artist} onChange={updateArtist} />
                    <label htmlFor='albumDescription'>Description</label>
                    <textarea type='text' className='form-control' id='albumDescription' placeholder='Enter Album Description' value={description} onChange={updateDescription} />
                    <label htmlFor='albumYear'>Year</label>
                    <input type='text' className='form-control' id='albumYear' placeholder='Enter Album Year' value={year} onChange={updateYear} />
                    <label htmlFor='albumImage'>Image</label>
                    <input type='text' className='form-control' id='albumImage' placeholder='Enter Album Image' value={image} onChange={updateImage} />
                </div>
                <div align='center'>
                    <button type='button' className='btn btn-light' onClick={handleCancel}>Cancel</button>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default EditAlbum;