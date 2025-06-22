import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/ToastProvider";
import API_PATHS from "../../utils/apiPaths";

const Signup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    const res = await fetch(API_PATHS.SIGNUP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      login(data.token);
      showToast("Signup successful!", "success");
      navigate("/dashboard");
    } else {
      showToast(data.message || "Signup failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Illustration */}
        <div className="hidden md:flex items-center justify-center bg-green-50 p-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Finance Illustration"
            className="w-40 h-40"
          />
        </div>
        {/* Form */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2331/2331943.png"
              alt="Finance Logo"
              className="mb-2 w-12 h-12"
            />
            <h2 className="text-2xl font-bold text-green-700 mb-1">
              Create your FinTrack account
            </h2>
            <p className="text-gray-500 text-sm">
              Start your journey to financial wellness!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={inputs.name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={inputs.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={inputs.password}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={inputs.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
