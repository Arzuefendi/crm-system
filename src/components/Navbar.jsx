import React, { useState } from "react";
import "../style/navbar.css";
import { RiUser3Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineBorderAll } from "react-icons/md";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Müştərilər");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <section>
      <div className="sidebar">
        <h5>
          <span>CRM</span> <span>Agent</span>
        </h5>
        <Link
          to="/user"
          className={activeLink === "Müştərilər" ? "active" : ""}
          onClick={() => handleLinkClick("Müştərilər")}
          id="link1"
        >
          <RiUser3Fill />
          Müştərilər
        </Link>
        <Link
          to="/order"
          className={activeLink === "Sifarişlər" ? "active" : ""}
          onClick={() => handleLinkClick("Sifarişlər")}
        >
          <MdOutlineBorderAll />
          Sifarişlər
        </Link>
        <Link
          to="/parameter"
          className={activeLink === "Parametrlər" ? "active" : ""}
          onClick={() => handleLinkClick("Parametrlər")}
        >
          <IoSettingsSharp />
          Parametrlər
        </Link>
      </div>
    </section>
  );
};

export default Navbar;
