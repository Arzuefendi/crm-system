import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const email = storedUserData ? storedUserData.email : "";
  const handleLogout = () => {
    onLogout();
    navigate("/");
  };
  return (
    <div>
      <header>
        <div className="header">
          <input type="text" className="searchInput" placeholder="Axtarış" />

          <div className="header-box">
            <IoMdHelpCircleOutline /> <p>Kömək</p>
            <img
              src="https://assets.ofs.com/s3fs-public/styles/square_thumbnail_large/public/2024-06/240529_OFS_Chicago80124_1920px_1.jpg?VersionId=igD7Ae65yoyWDl3MNZhZ.DGavJrFfgX6&itok=gRRhuQE9"
              alt=""
            />
            <p>{email}</p>
            <IoLogOutOutline onClick={handleLogout} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
