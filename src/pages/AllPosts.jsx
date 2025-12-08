import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    appwriteService.getPosts([]).then((response) => {
        setPosts(response?.documents || []);
    });
}, []);


    return (
        <div className="w-full py-8 h-[80vh]">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                           <PostCard 
    $id={post.$id}
    title={post.title}
    featureImage={post.featureImage}  // THIS must match your DB field name
/>
  
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
