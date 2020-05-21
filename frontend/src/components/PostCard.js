import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUserInfo } from "../Helpers/localStorage";
import { updateLikes, updateBookmarks } from "../Helpers/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostCard({
  id,
  tags,
  title,
  description,
  author,
  date,
  imageUrl,
  isLiked,
  isBookMarked,
}) {
  const [liked, setLiked] = useState(false);
  const [bookMarked, setBookMarked] = useState(false);

  useEffect(() => {
    if (isLiked) {
      setLiked(true);
    }
    if (isBookMarked) {
      setBookMarked(true);
    }
  }, []);

  const copyToClipBoard = () => {
    navigator.clipboard
      .writeText(`${window.location.href}post/${id}`)
      .then(() => {
        toast.success("Copied to ClipBoard", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: true,
        });
      });
  };

  const setBookmark = () => {
    const user = getUserInfo();
    if (!user) {
      history.push("/signin");
    } else {
      if (bookMarked) {
        updateBookmarks("unBookMark", id).then((response) => {
          if (response.status === 1) {
            setBookMarked(false);
          } else if (response.status == 0) {
            setBookMarked(true);
          }
        });
      } else if (!bookMarked) {
        updateBookmarks("bookMark", id).then((response) => {
          if (response.status === 1) {
            setBookMarked(true);
          } else if (response.status == 0) {
            setBookMarked(false);
          }
        });
      }
    }
  };

  const setLike = () => {
    const user = getUserInfo();
    if (!user) {
      history.push("/signin");
    } else {
      if (liked) {
        updateLikes("unlike", id).then((response) => {
          if (response.status === 1) {
            setLiked(false);
          } else if (response.status == 0) {
            setLiked(true);
          }
        });
      } else if (!liked) {
        updateLikes("like", id).then((response) => {
          if (response.status === 1) {
            setLiked(true);
          } else if (response.status === 0) {
            setLiked(false);
          }
        });
      }
    }
  };

  const history = useHistory();

  return (
    <div className="postCard">
      <img
        className="image"
        src={imageUrl}
        onClick={() => history.push(`/post/${id}`)}
      />
      <div className="info">
        <p>{tags.map((tag) => `#${tag.toUpperCase()} `)}</p>
        <div className="postTitle" onClick={() => history.push(`/post/${id}`)}>
          {title}
        </div>
        <div className="subTitle" onClick={() => history.push(`/post/${id}`)}>
          {description}
        </div>
        <div className="dateAndTools">
          <div className="date" onClick={() => history.push(`/post/${id}`)}>
            {date} - {author}
          </div>
          <div className="tools">
            <div className="toolsBtn">
              <img
                src={
                  liked
                    ? require("../assets/like.png")
                    : require("../assets/unlike.png")
                }
                alt=""
                className="likeBtn"
                onClick={setLike}
              />
            </div>
            <div className="toolsBtn">
              <div className="dropDown">
                <img src={require("../assets/share.png")} alt="" />
                <div className="shareDropDownContent">
                  <div className="arrow-up"></div>
                  <div className="shareDropDownBtn">
                    <img
                      src={require("../assets/facebookShare.png")}
                      alt=""
                      className="shareImg"
                    />
                    <img
                      src={require("../assets/clipBoard.png")}
                      alt=""
                      className="shareImg"
                      onClick={copyToClipBoard}
                    />
                    <img
                      src={require("../assets/twitter.png")}
                      alt=""
                      className="shareImg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="toolsBtn">
              <img
                src={
                  bookMarked
                    ? require("../assets/bookmarked.png")
                    : require("../assets/bookmark.png")
                }
                alt=""
                onClick={setBookmark}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer limit={1} />
    </div>
  );
}
