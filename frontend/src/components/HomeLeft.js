import React, { useState, useRef, useCallback } from "react";
import useGetArticles from "../hooks/useGetArticles";
import PostCard from "./PostCard";
import Spinner from "./Spinner";
export default function HomeLeft({ tag, pageNumber }) {
  const [currentPageNumber, setCurrentPageNumber] = useState(pageNumber);
  const [tagname, setTagname] = useState(tag);
  // console.log(pageNumber);
  const { posts, hasMore, loading, error } = useGetArticles(
    tagname,
    currentPageNumber
  );

  const observer = useRef();

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPageNumber((prevPageNumer) => prevPageNumer + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );
  return (
    <div className="posts">
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostRef} key={post._id}>
              <PostCard
                isBookMarked={post.isBookMarked}
                isLiked={post.isLiked}
                id={post._id}
                tags={post.tags}
                title={post.title}
                description={post.description}
                author={post.author}
                date={post.date}
                imageUrl={post.titleImage}
              />
            </div>
          );
        } else {
          return (
            <div key={post._id}>
              <PostCard
                isBookMarked={post.isBookMarked}
                isLiked={post.isLiked}
                id={post._id}
                tags={post.tags}
                title={post.title}
                description={post.description}
                author={post.author}
                date={post.date}
                imageUrl={post.titleImage}
              />
            </div>
          );
        }
      })}
      <Spinner loading={loading} hasMore={hasMore} />
      <div className={error ? "error" : "display-none"}>error..</div>
    </div>
  );
}
