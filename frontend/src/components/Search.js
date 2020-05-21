import React, { useState, useRef, useCallback } from "react";
import useGetSearchResults from "../hooks/useGetSearchResults";
import PostCard from "./PostCard";
import Spinner from "./Spinner";

export default function Search() {
  const [queryString, setQueryString] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, hasMore, error, results } = useGetSearchResults(
    queryString,
    pageNumber
  );

  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevpageNumber) => prevpageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );
  function handleSearch(e) {
    setQueryString(e.target.value);
    setPageNumber(1);
  }

  const showResults = () => {
    return (
      <div className="searchResults">
        {results.map((result, index) => {
          if (results.length === index + 1) {
            return (
              <div ref={lastPostRef} key={result._id}>
                <PostCard
                  isLiked={result.isLiked}
                  isBookMarked={result.isBookMarked}
                  id={result._id}
                  tags={result.tags}
                  title={result.title}
                  description={result.description}
                  author={result.author}
                  date={result.date}
                  imageUrl={result.titleImage}
                />
              </div>
            );
          } else {
            return (
              <div key={result._id}>
                <PostCard
                  isLiked={result.isLiked}
                  isBookMarked={result.isBookMarked}
                  id={result._id}
                  tags={result.tags}
                  title={result.title}
                  description={result.description}
                  author={result.author}
                  date={result.date}
                  imageUrl={result.titleImage}
                />
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="searchDiv">
      <input
        type="text"
        value={queryString}
        onChange={handleSearch}
        className="searchField"
        placeholder="Search.."
      />
      {showResults()}
      <Spinner loading={loading} hasMore={hasMore} />
      <div className="error">{error && "error..."}</div>
    </div>
  );
}
