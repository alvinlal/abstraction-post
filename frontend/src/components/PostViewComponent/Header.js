import React from "react";

export default function Header({ title, date, author, isLiked, isBookMarked }) {
  return (
    <div>
      <div className="postViewTitle">{title}</div>
      <div className="postDateAndTools">
        <div className="postDate">
          <img
            src={require("../../assets/calender.png")}
            alt=""
            className="calender"
          />
          {date} {author}
        </div>
        <div className="postTools">
          <img
            src={require("../../assets/unlike.png")}
            className="postToolsBtn"
            alt=""
          />
          <img
            src={require("../../assets/share.png")}
            className="postToolsBtn"
            alt=""
          />
          <img
            src={require("../../assets/bookmark.png")}
            className="postToolsBtn"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
