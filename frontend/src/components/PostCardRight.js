import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUserInfo } from "../Helpers/localStorage";
import { updateLikes, updateBookmarks } from "../Helpers/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function PostCardRight({
  id,
  tags,
  title,
  description,
  date,
  author,
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
    <div
      className="postCardRight"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="postRightblackOverlay">
        <div className="tagsRight" onClick={() => history.push(`/post/${id}`)}>
          {tags.map((tag, index) => `#${tag.toUpperCase()} `)}
        </div>
        <div
          className="postCardRightTitle"
          onClick={() => history.push(`/post/${id}`)}
        >
          {title}
        </div>
        <div
          className="postCardRightDescription"
          onClick={() => history.push(`/post/${id}`)}
        >
          {description}
        </div>
        <div className="dateAndToolsRight">
          <div
            className="dateRight"
            onClick={() => history.push(`/post/${id}`)}
          >
            {date}-{author}
          </div>
          <div className="toolsRight">
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
              <div className="dropDownRight">
                <img src={require("../assets/share.png")} alt="" />
                <div className="shareDropDownContentRight">
                  <div className="arrow-upRight"></div>
                  <div className="shareDropDownBtnRight">
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
    </div>
  );
}
