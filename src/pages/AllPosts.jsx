import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if(!user) return;

        appwriteService.getUserPosts(user.$id).then((response) => {
            setPosts(response ?? []);   
            setLoading(false);
        });
    }, [user]);


    const skeletons = Array.from({ length: 6 }, (_, i) => i);


    return (    
        <div className="w-full py-10 min-h-screen bg-[#071a1e] overflow-x-hidden">
            <Container>
                <h1 className="text-2xl font-semibold mb-6 text-white">
                    Your Posts
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading? 
                          skeletons.map((i) => (
                              <div
                                  key={i}
                                  className="rounded-2xl bg-slate-800 p-4 animate-pulse"
                              >
                                  <div className="w-full h-40 bg-slate-700 rounded-lg mb-4" />
                                  <div className="h-4 bg-slate-700 rounded w-3/4 mb-2" />
                                  <div className="h-3 bg-slate-700 rounded w-1/2 mb-1" />
                                  <div className="h-3 bg-slate-700 rounded w-2/3" />
                              </div>
                          ))
                        : 
                          posts.map((post) => (
                            
                              <PostCard
                                  key={post.$id}
                                  $id={post.$id}
                                  title={post.title}
                                  featureImage={post.featureImage}
                                  createdAt={post.$createdAt}
                                 
                              />
                              
                          )) }
                         

                          {!loading && posts.length === 0 && (
                            <div className="flex justify-center">
                                 <p className=" w-full text-center text-gray-400 mt-10">
    You haven’t created any posts yet.
  </p>
                            </div>
 
)}
                </div>
            </Container>
        </div>
    );
}


