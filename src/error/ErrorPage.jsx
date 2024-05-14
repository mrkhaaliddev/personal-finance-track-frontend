import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center mt-60">
        <h1 className="text-5xl mb-5">404 Page Not Found!</h1>
        <button className="px-4 py-2 text-xl rounded-md text-white bg-[#157AFF]">
          <Link to="/login">Go Back</Link>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
