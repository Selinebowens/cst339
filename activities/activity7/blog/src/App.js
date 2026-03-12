import React, { useState } from 'react';
import Post from './Post';
import AddPost from './AddPost';

function App() {
    const [postId, setPostId] = useState(3);
    const [postList, setPostList] = useState([
        { postNumber: 0, text: 'A short psychic broke out of jail. She was a small medium at large.' },
        { postNumber: 1, text: 'I used to hate facial hair, but then it grew on me.' },
        { postNumber: 2, text: 'I asked the librarian if they had books about paranoia. She whispered: they are right behind you.' },
    ]);

    const handleDeletePost = (id) => {
        let updatedPostList = postList.filter(post => post.postNumber !== id);
        setPostList(updatedPostList);
    };

    const handleAddPost = (newText) => {
        let newPost = {
            postNumber: postId,
            text: newText
        };
        setPostList(postList => [...postList, newPost]);
        setPostId(postId + 1);
    };

    const posts = postList.map((post) => (
        <Post key={post.postNumber} text={post.text} id={post.postNumber} onDelete={handleDeletePost} />
    ));

    return (
        <div>
            {posts}
            <AddPost onAdd={handleAddPost} />
        </div>
    );
}

export default App;