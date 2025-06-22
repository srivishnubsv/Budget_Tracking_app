import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/home" />} />
          <Route path="/dashboard/home" element={<Home />} />
          <Route path="/dashboard/income" element={<Income />} />
          <Route path="/dashboard/expense" element={<Expense />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;