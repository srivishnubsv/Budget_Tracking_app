import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User2 } from "lucide-react"; // Modern profile icon
import { getProfile, changePassword } from "../utils/api";
import { useToast } from "../components/ToastProvider";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    getProfile()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMsg("");
    try {
      await changePassword(oldPassword, newPassword);
      showToast("Password changed successfully", "success");
      setPasswordMsg("");
      setOldPassword("");
      setNewPassword("");
      setShowPasswordFields(false);
    } catch (err) {
      setPasswordMsg(
        err?.response?.data?.message || "Failed to change password"
      );
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="w-full max-w-xl mx-auto py-10 px-4">
      <div className="flex flex-col items-center mb-8">
        <User2 className="text-blue-500" size={72} />
        <h2 className="text-2xl font-bold mt-4 mb-1">{user.name}</h2>
        <span className="text-gray-500">{user.email}</span>
      </div>
      <div className="bg-white rounded-lg shadow p-6 w-full">
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            value={user.name}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-2"
            value={user.email}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">
            Username
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            value={user.username}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">
            Joined
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            value={new Date(user.joined).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
            readOnly
          />
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full mt-2 mb-4">
          {!showPasswordFields && (
            <button
              type="button"
              className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 w-full sm:w-auto"
              onClick={() => setShowPasswordFields(true)}
            >
              Change Password
            </button>
          )}
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 w-full sm:w-auto"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
        {/* Change Password Section */}
        {showPasswordFields && (
          <form onSubmit={handlePasswordChange} className="mb-4">
            <div className="mb-2">
              <label className="block text-gray-600 font-semibold mb-1">
                Old Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-600 font-semibold mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full mt-2">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 w-full sm:w-auto"
              >
                Save Password
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-400 w-full sm:w-auto"
                onClick={() => {
                  setShowPasswordFields(false);
                  setOldPassword("");
                  setNewPassword("");
                  setPasswordMsg("");
                }}
              >
                Cancel
              </button>
            </div>
            {passwordMsg && (
              <div className="mt-2 text-sm text-center text-red-500">
                {passwordMsg}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
