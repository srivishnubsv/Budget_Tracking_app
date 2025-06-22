import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  UserCircle,
  LogOut,
} from "lucide-react";
import { getProfile } from "../utils/api";

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="text-purple-500 w-5 h-5" />,
  },
  {
    to: "/income",
    label: "Income",
    icon: <Wallet className="text-green-500 w-5 h-5" />,
  },
  {
    to: "/expense",
    label: "Expense",
    icon: <Receipt className="text-red-500 w-5 h-5" />,
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then((data) => setUsername(data.username))
      .catch(() => setUsername("Profile"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/logout");
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="fixed top-4 left-4 z-50 sm:hidden bg-white p-2 rounded-full shadow"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Open sidebar"
      >
        <FaBars size={22} />
      </button>
      {/* Sidebar */}
      <aside
        className={`fixed sm:static z-40 top-0 left-0 bg-gradient-to-b from-green-100 via-purple-100 to-white text-gray-900 shadow-lg transition-all duration-300 ${
          open ? "w-56" : "w-16"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
        style={{
          minHeight: "100vh",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <div className="flex flex-col h-full justify-between">
          {/* Profile */}
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            <button
              className="flex items-center gap-2 focus:outline-none"
              onClick={() => navigate("/profile")}
              aria-label="Profile"
            >
              <UserCircle size={open ? 32 : 28} className="text-blue-500" />
              {open && (
                <span className="font-semibold text-lg">{"Profile"}</span>
              )}
            </button>
            {/* Shrink/Expand Button */}
            <button
              className="ml-auto text-gray-400 hover:text-gray-700 hidden sm:block"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Shrink sidebar"
            >
              {open ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
          </div>
          {/* Nav */}
          <nav className="flex-1 flex flex-col gap-2 mt-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded transition font-medium hover:bg-purple-100 ${
                    isActive ? "bg-purple-200" : ""
                  } ${open ? "justify-start" : "justify-center"}`
                }
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                {open && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 justify-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold"
            >
              <LogOut className="w-5 h-5" />
              {open && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 sm:hidden"
          style={{
            background: "rgba(0,0,0,0.10)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
