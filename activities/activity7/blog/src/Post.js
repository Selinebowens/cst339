import React from 'react';
import './Post.css';

const Post = (props) => {
    return (
        <div className='post-container'>
            <span> Blog entry # {props.id}</span>
            <p>{props.text}</p>
            <button onClick={() => props.onDelete(props.id)}>Delete</button>
        </div>
    );
};

export default Post;