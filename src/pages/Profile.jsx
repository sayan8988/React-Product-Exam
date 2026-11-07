
import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, ArrowLeft, LogOut } from "lucide-react";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "Not available";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/", { replace: true });
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <button
          className="profile-back"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="profile-avatar">
          <User size={42} />
        </div>

        <h2>My Profile</h2>
        <p className="profile-subtitle">Your account information</p>

        <div className="profile-info">
          <div className="profile-info-icon">
            <Mail size={20} />
          </div>
          <div>
            <span>Email Address</span>
            <p>{email}</p>
          </div>
        </div>

        <button className="profile-logout" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
