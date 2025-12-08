import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

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

    // Run this only AFTER post is loaded
    if (!post) {
        return (
            <div className="py-8 text-center text-white text-xl">
                Loading...
            </div>
        );
    }

    const isAuthor = userData ? post.userId === userData.$id : false;

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featureImage);
                navigate("/");
            }
        });
    };

    // Debug logs (now safe because post exists)
    console.log("POST DATA:", post);
    console.log(
        "PREVIEW URL:",
        appwriteService.getFileView(post.featureImage)
    );

    return (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">

                    {post.featureImage && (
                        <img
                            src={appwriteService.getFileView(post.featureImage)}
                            alt={post.title}
                            className="rounded-xl"
                        />
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                <div className="browser-css">{parse(post.content)}</div>
            </Container>
        </div>
    );
}
