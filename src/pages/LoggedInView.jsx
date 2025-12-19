import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import AuthToast from "../components/AuthToast";

export default function LoggedInView() {
  const [posts, setPosts] = useState([]);
  const [toastMessage, setToastMessage] = useState("");



  useEffect(() => {
    appwriteService.getPosts().then((documents) => {
      setPosts(documents);
    });
  }, []);

  useEffect(() => {
    const toastFlag = sessionStorage.getItem("loginToastShown");
    if(toastFlag){
       setToastMessage("Login successful, Welcome back! 👋");
       sessionStorage.removeItem("loginToastShown");
    }
   
  }, []);
  return (
    <>
      {toastMessage && (
        <AuthToast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}

      <div className="min-h-screen w-full bg-[#071a1e] text-white px-6 py-10">
        <h1 className="text-3xl mb-6 font-semibold">
          Community Posts
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </div>
    </>
  );
}
