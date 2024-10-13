import { useState, useEffect } from "react";
import axios from "axios";

function PostTraditional() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    try {
      const response = await axios.get("http://localhost:4000/posts"); 
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Post Traditional</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostTraditional;
