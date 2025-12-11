import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import SocialLinks from "../components/SocialLinks";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
 

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (!post) {
    return (
       <div className="w-full animate-pulse">
      <div className="h-40 bg-slate-700/40 rounded-lg mb-4"></div>

      <div className="h-4 bg-slate-700/40 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-slate-700/40 rounded w-1/2 mb-4"></div>

      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-slate-700/40 rounded-full"></div>
        <div className="h-4 bg-slate-700/40 rounded w-1/4"></div>
      </div>
    </div>
    );
  }

  const isAuthor = userData ? post.userId === userData.$id : false;
  

  return (
    <div className="min-h-screen py-10 bg-[#071a1e] text-white">
      <Container>

        {/* IMAGE SECTION */}

        <div className="relative max-w-4xl mx-auto mb-10 flex justify-center">

          {post.featureImage && (
            <div className="w-full h-64 sm:h-96 overflow-hidden rounded-2xl shadow-xl">
              <img
                src={appwriteService.getFileView(post.featureImage)}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* AUTHOR CONTROLS */}
          {isAuthor && (
            <div className="
              absolute top-4 right-4 flex gap-3
              bg-white/10 backdrop-blur-lg 
              px-4 py-2 rounded-xl border border-white/20
              shadow-xl
            ">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-600 hover:bg-green-500"
                  className="px-4">
                  Edit
                </Button>
              </Link>

              <Button
                bgColor="bg-red-600 hover:bg-red-500"
                onClick={() => {
                  appwriteService.deletePost(post.$id).then((status) => {
                    if (status) {
                      appwriteService.deleteFile(post.featureImage);
                      navigate("/");
                    }
                  });
                }}
                className="px-4"
              >
                Delete
              </Button>
            </div>
          )}

        </div>

        
         
<div className="max-w-4xl mx-auto text-center mb-10">

  {/* Title */}
  <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
    {post.title}
  </h1>
  

  {/* Author + Date */}
  <div className="mt-5 flex items-center justify-center gap-3 text-gray-300">
    {/* Avatar */}
    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
      {post.userName? post.userName.charAt(0).toUpperCase() : "A"}
    </div>

    {/* Name & Date */}
    
    <div className="text-left">
      <p className="font-medium text-gray-200">{post.userName || "Unknown Author"
}</p>
      <p className="text-gray-400 text-sm">
        {post.$createdAt
          ? new Date(post.$createdAt).toLocaleDateString("en-IN", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : ""}
      </p>
    </div>
  </div>

 


</div>


        {/* CONTENT */}
        <div
          className="
            max-w-3xl mx-auto 
            prose prose-invert prose-lg 
            leading-relaxed
            text-gray-200
            mt-10
          "
        >
          {parse(post.content)}
        </div>
          <div className="mt-6 flex  justify-center  gap-2 items-center">
    <p>Share it on other Socials</p>
      <SocialLinks/>
  </div>

      </Container>
    </div>
  );
}
