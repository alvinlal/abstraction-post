import React from "react";

export default function Embeded({ url, height, width, caption, service }) {
  const iheight = service == "twitter" ? 550 : height;
  const iwidth = width;
  return (
    <div className="postEmbeded">
      <iframe
        src={url}
        height={iheight}
        width={iwidth}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      {caption && <div className="postCaption">{caption}</div>}
    </div>
  );
}
