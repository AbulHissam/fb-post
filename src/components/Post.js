import React from "react";
import "./Post.css";
import { useSelector } from "react-redux";
import { postsSelector } from "../redux/postSlice";

import User from "./User";
function Post() {
  const posts = useSelector(postsSelector);
  return (
    <div className="post">
      <h5>Your Posts</h5>
      {posts.map((post) => {
        return (
          // post only if either of message or gif is not empty
          (post.postMessage || post.gif) && (
            <div className="post__container">
              <User />
              <div className="post__content">
                {/* Add Post messge in post in posts only if message is not empty */}
                {post.postMessage && (
                  <p className="post__message">{post.postMessage}</p>
                )}
                {/* Add gif in posts only if gif url is not empty */}
                {post.gif && (
                  <img src={post.gif} className="post__gif" alt="GiF" />
                )}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}

export default Post;
