import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../backend";

export default function useGetSearchResults(queryString, pageNumber) {
  const [error, setError] = useState(false);
  const [results, setresults] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setresults([]);
  }, [queryString]);

  useEffect(() => {
    setError(false);
    setLoading(true);
    // alert(pageNumber);
    let cancel;
    axios({
      method: "GET",
      url: `${API}/search`,
      params: { queryString, pageNumber },
      withCredentials: true,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setresults((prevResults) => {
          return [...new Set([...prevResults, ...response.data.results])];
        });

        setHasMore(response.data.results.length > 0);

        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        console.log(err);
        setError(true);
      });
    return () => cancel();
  }, [queryString, pageNumber]);

  return { loading, hasMore, error, results };
}
