import React, { useEffect, useState }  from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

export default function LoggedInView(){
       const [posts, setPosts] = useState([]);
         
           useEffect(() => {
    appwriteService.getPosts().then((document) => {
      
        setPosts(document);
      
    });
  }, []);

    return(
        <>
         <div className="min-h-screen w-full bg-[#071a1e] text-white px-6 py-10">
      <h1 className="text-3xl mb-6 font-semibold">Community Posts</h1>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard key={post.$id} {...post} />
        ))}
      </div>
    </div>
</>
    )

}