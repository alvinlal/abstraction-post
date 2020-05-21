import React, { useState, useEffect } from "react";
import { getBookmarks } from "../Helpers/apiCalls";
import PostCard from "../components/PostCard";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    getBookmarks().then((response) => {
      if (response?.bookmarks) {
        console.log(response);
        setBookmarks(response.bookmarks);
      }
    });
  }, []);

  return (
    <div className="bookmarks">
      {bookmarks.map((bookmark) => {
        return (
          <PostCard
            isBookMarked={bookmark.isBookMarked}
            key={bookmark._id}
            isLiked={bookmark.isLiked}
            id={bookmark._id}
            tags={bookmark.tags}
            title={bookmark.title}
            description={bookmark.description}
            author={bookmark.author}
            date={bookmark.date}
            imageUrl={bookmark.titleImage}
          />
        );
      })}
    </div>
  );
}
