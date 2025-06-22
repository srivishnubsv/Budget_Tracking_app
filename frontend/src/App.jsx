import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import { ToastProvider } from "./components/ToastProvider";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Profile from "./pages/Profile";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const MainLayout = ({ children }) => {
  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
};

const LayoutWithSidebar = ({ children }) => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <div className="flex min-h-screen bg-gray-100">
      {!hideSidebar && <Sidebar />}
      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          !hideSidebar ? "lg:ml-16 xl:ml-36" : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <ToastProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/income"
              element={
                <PrivateRoute>
                  <Income />
                </PrivateRoute>
              }
            />
            <Route
              path="/expense"
              element={
                <PrivateRoute>
                  <Expense />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </Router>
    </ToastProvider>
  </AuthProvider>
);

export default App;
