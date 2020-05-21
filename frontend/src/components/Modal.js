import React from "react";

export default function Modal({ handleClose, show, children }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div className="modal-content">
          <div className="title">
            Title:
            <select>
              <option className="modal-option">test</option>
              <option className="modal-option">test</option>
              <option className="modal-option">test</option>
            </select>
          </div>
          <div className="description">
            Description:
            <input type="text" list="descriptions" />
            <datalist id="descriptions">
              <option>sdfdsf</option>
              <option>sdfdsf</option>
              <option>sdfdsf</option>
            </datalist>
          </div>
        </div>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}
