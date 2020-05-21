import React from "react";

export default function CheckList({ contents }) {
  return (
    <div className="postCheckList">
      {contents.map((item, index) => {
        return (
          <div className="postCheckItem">
            <input
              type="checkbox"
              name={index}
              checked={item.checked}
              className="postCheckBox"
            />
            <label htmlFor={index}>{item.text}</label>
          </div>
        );
      })}
    </div>
  );
}
