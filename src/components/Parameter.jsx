import React from "react";
import Navbar from "../components/Navbar";
import Header from "./Header";

const Parameter = ({ onLogout }) => {
  return (
    <div>
      <Navbar />
      <Header onLogout={onLogout} />
      <h1 className="text-center mt-5">Soon</h1>
    </div>
  );
};

export default Parameter;
