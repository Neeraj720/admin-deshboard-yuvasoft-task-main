import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center Link"
        style={{ height: "100vh" }}
      >
        <div className="px-3 py-3 shadow-lg">
          <h1 className="text-primary">404 Page not found</h1>
          <Link to="/" className="btn btn-primary mb-3">
            Go to HomePage
          </Link>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
