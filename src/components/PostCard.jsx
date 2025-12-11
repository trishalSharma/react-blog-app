import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function formatDate(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function PostCard({ $id, title, featureImage, createdAt }) {
   
    const displayTitle =
        title && title.length > 60 ? title.slice(0, 57) + "..." : title;

    return (
        <Link to={`/post/${$id}`}>
            <div className="
                w-full 
                bg-slate-900 
                rounded-xl 
                p-3 
                shadow-sm 
                hover:shadow-lg 
                hover:-translate-y-1 
                transition 
                duration-200 
                flex 
                flex-col
            ">
            <div className="w-full h-40 overflow-hidden rounded-lg">
    {featureImage ? (
        <img
            src={appwriteService.getFileView(featureImage)}
            alt={title}
            className="w-full h-full object-cover transition duration-200 hover:scale-105"
        />
    ) : (
        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 text-sm">
            No image
        </div>
    )}
</div>

               
                <div className="flex-1 flex flex-col">
                    <h2 className="text-lg font-semibold text-white mb-1 wrap-break-words">
                        {displayTitle}
                    </h2>

                    {createdAt && (
                        <p className="text-xs text-slate-400 mb-2">
                            {formatDate(createdAt)}
                        </p>
                    )}

                    <p className="text-sm text-slate-300 line-clamp-2">
                        Click to read this post.
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
