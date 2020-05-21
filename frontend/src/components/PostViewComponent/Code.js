import React from "react";
import HighLight from "react-highlight.js";

export default function Code({ code, language = "javascript" }) {
  return (
    <div className="postCode">
      <HighLight language={language}>{code}</HighLight>
    </div>
  );
}
