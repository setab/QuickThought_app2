import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/logout", // Backend logout endpoint
        {},
        { withCredentials: true } // Include credentials for session
      );

      if (response.status === 200) {
        console.log(response.data.message); // "Logged out successfully"
        localStorage.removeItem("authToken"); // Clear stored auth token if applicable
        sessionStorage.clear(); // Clear session storage if applicable
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
    >
      <FiLogOut />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
