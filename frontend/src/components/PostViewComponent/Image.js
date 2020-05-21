import React from "react";

export default function Image({ url, stretch, caption }) {
  const className = stretch ? "postImageStretch" : "postImage";

  return (
    <div className={className}>
      <img src={url} alt="" />
      {caption && <div className="postCaption">{caption}</div>}
    </div>
  );
}
