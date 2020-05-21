import { useEffect, useState } from "react";
import axios from "axios";
import API from "../backend";

export default function useGetArticles(tag, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  // console.log(tag);
  useEffect(() => {
    setPosts([]);
  }, [tag]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: `${API}/articles/${tag}`,
      params: { pageNumber: pageNumber },
      withCredentials: true,
    })
      .then((response) => {
        setPosts((prevData) => {
          return [
            ...new Set([...prevData, ...response.data.articles.articlesData]),
          ].sort((a, b) => {
            return b.article.time - a.article.time;
          });
        });

        setHasMore(response.data.articles.articlesData.length > 0);

        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, [pageNumber, tag]);
  return { loading, error, posts, hasMore, setPosts };
}
