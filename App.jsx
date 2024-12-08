import React, { useState } from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import ProductCRUD from "./components/ProductCRUD";

const App = () => {
  const [selectedMenu, setSelectedMenu] = useState("");

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-grow">
        <SideBar onMenuClick={setSelectedMenu} />
        <div className="w-3/4 bg-white p-6">
          {selectedMenu === "productMaster" && <ProductCRUD dataSource="/products.json" />}
        </div>
      </div>
    </div>
  );
};

export default App;
