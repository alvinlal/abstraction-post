import React from "react";

export default function List({ contents, order }) {
  const items = contents.map((item, index) => {
    return <li>{item}</li>;
  });
  return (
    <div className="postList">
      {order == "ordered" ? <ol>{items}</ol> : <ul>{items}</ul>}
    </div>
  );
}
