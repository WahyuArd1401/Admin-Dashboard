import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import DarkModeToggle from "./DarkModeToggle";

function Navbar({ onLogout }) {
  const [name, setName] = useState(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    return user ? user.name : "";
  });

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-bold">Administrasi</h1>
      <div className="flex items-center space-x-4">
        <DarkModeToggle />
        <div className="relative">
          <Dropdown username={name} onLogout={onLogout} />
        </div>
      </div>
    </nav>

  );
}

export default Navbar;
