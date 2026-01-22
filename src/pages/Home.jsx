import { useState } from "react";
import { useSelector } from "react-redux";
import LoggedOutView from "./LoggedOutView";
import LoggedInView from "./LoggedInView";

function Home() {
  const [posts, setPosts] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.status)

  return (
    <>
  {!isLoggedIn ?    (
    
      <LoggedOutView/>
    ) : (
     <LoggedInView posts = {posts} />
      )}
    
  </>
  );
}

export default Home;
