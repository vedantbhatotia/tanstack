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
    <div className="post-list">
      {posts.map(post => (
          <div onClick={() => handleClick(post.id)} key={post.id} className="post-item">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
          </div>
      ))}
  </div>
  );
}

export default PostTraditional;
