import React from "react";

const SideBar = ({ onMenuClick }) => {
  return (
    <div className="w-1/4 bg-gray-100 h-screen p-4 shadow-md">
      <div
        className="text-lg font-medium cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-200 transition"
        onClick={() => onMenuClick("productMaster")}
      >
        Product Master
      </div>
    </div>
  );
};

export default SideBar;
