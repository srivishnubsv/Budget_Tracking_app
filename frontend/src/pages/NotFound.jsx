import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h1 className="text-4xl font-bold mb-4 text-red-600">404 - Not Found</h1>
    <p className="mb-4">The page you are looking for does not exist.</p>
    <Link to="/" className="text-blue-600 underline">
      Go Home
    </Link>
  </div>
);

export default NotFound;
