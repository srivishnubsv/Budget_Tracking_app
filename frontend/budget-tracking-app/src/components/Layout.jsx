import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <nav className="bg-blue-600 text-white w-1/4 p-4">
        <h2 className="text-xl font-bold mb-4">Budget Tracker</h2>
        <ul>
          <li>
            <Link to="/dashboard" className="block py-2">Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard/income" className="block py-2">Income</Link>
          </li>
          <li>
            <Link to="/dashboard/expense" className="block py-2">Expense</Link>
          </li>
          <li>
            <Link to="/login" className="block py-2">Login</Link>
          </li>
          <li>
            <Link to="/signup" className="block py-2">Sign Up</Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;