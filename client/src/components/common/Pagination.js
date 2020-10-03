import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ page, pages, count }) => {
  return (
    <div className="d-flex justify-content-around py-3 my-2 border-top border-bottom">
      {page > 1 ? (
        <Link
          to={`/stores/page/${page - 1}`}
          style={{ textDecoration: "none" }}
        >
          <h6>⇠ Previous</h6>
        </Link>
      ) : null}
      <h6>
        Page {page} of {pages} - {count} total results
      </h6>
      {page < pages ? (
        <Link
          to={`/stores/page/${parseFloat(page) + 1}`}
          style={{ textDecoration: "none" }}
        >
          <h6>Next ⇢</h6>
        </Link>
      ) : null}
    </div>
  );
};

export default Pagination;
