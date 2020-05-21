import React from "react";

export default function Paragraph({ text }) {
  return (
    <div
      className="postParagraph"
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
}
