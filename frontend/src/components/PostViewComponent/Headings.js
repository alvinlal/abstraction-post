import React from "react";

export default function Headings({ text, level }) {
  const getHeadingSize = (level) => {
    switch (level) {
      case 1:
        return 32;
      case 2:
        return 24;
      case 3:
        return 18.72;
      case 4:
        return 16;
      default:
        return 16;
    }
  };
  const headingSize = getHeadingSize(level);

  return (
    <div className="postHeadings" style={{ fontSize: headingSize }}>
      {text}
    </div>
  );
}
