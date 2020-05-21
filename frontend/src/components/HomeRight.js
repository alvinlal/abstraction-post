import React, { useState, useRef, useCallback, useEffect } from "react";
import useGetArticles from "../hooks/useGetArticles";
import PostCardRight from "./PostCardRight";
import Spinner from "./Spinner";

export default function HomeRight({ tag }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [tagname, setTagname] = useState(tag);
  const { loading, hasMore, error, posts } = useGetArticles(
    tagname,
    pageNumber
  );

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  return (
    <div className="HomeRight">
      {posts.map((post, index) => {
        if (posts.length == index + 1) {
          return (
            <div ref={lastElementRef} key={index}>
              <PostCardRight
                id={post._id}
                tags={post.tags}
                title={post.title}
                description={post.description}
                author={post.author}
                date={post.date}
                imageUrl={post.titleImage}
                isLiked={post.isLiked}
                isBookMarked={post.isBookMarked}
              />
            </div>
          );
        } else {
          return (
            <div key={index}>
              <PostCardRight
                id={post._id}
                tags={post.tags}
                title={post.title}
                description={post.description}
                author={post.author}
                date={post.date}
                imageUrl={post.titleImage}
                isLiked={post.isLiked}
                isBookMarked={post.isBookMarked}
              />
            </div>
          );
        }
      })}
      <Spinner loading={loading} hasMore={hasMore} />

      {error && <div className="error">error..</div>}
    </div>
  );
}
