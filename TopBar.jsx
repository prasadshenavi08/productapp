import React from "react";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-teal-400 text-white shadow-md">
      <div className="text-2xl font-bold">Application Name</div>
      <div className="flex items-center space-x-6">
        <div className="cursor-pointer text-lg hover:text-gray-200">🔔 Notifications</div>
        <div className="cursor-pointer text-lg hover:text-gray-200">👤 User Profile</div>
      </div>
    </div>
  );
};

export default TopBar;
