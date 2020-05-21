import React from "react";

export default function Note({ title, message }) {
  return (
    <div className="postNotes">
      <div className="postNoteTitle">{title}</div>
      <div className="postNoteMessage">{message}</div>
    </div>
  );
}
