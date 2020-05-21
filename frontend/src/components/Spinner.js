import React from "react";

function Spinner({ loading, hasMore }) {
  return (
    <div className={loading && hasMore ? "spinner" : "display-none"}></div>
  );
}

export default React.memo(Spinner);
