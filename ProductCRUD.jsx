import React, { useState, useEffect } from "react";

const ProductCRUD = ({ dataSource }) => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    fetch(dataSource)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [dataSource]);

  const getNextId = () => {
    if (products.length === 0) return 1;
    const maxId = Math.max(...products.map((product) => product.id));
    return maxId + 1;
  };

  const handleCreate = () => {
    if (!formData.name || !formData.price) {
      alert("Please fill out all fields");
      return;
    }

    if (isEditing) {
      setProducts(      //upadate data
        products.map((product) =>
          product.id === formData.id ? { ...product, ...formData } : product
        )
      );
      setNotification({ message: "Record updated successfully!", type: "success" });
      setIsEditing(false);
    } else {
      
      setProducts([ //// Add new data
        ...products,
        { id: getNextId(), name: formData.name, price: formData.price },
      ]);
      setNotification({ message: "New record created successfully!", type: "success" });
    }

    setFormData({ id: "", name: "", price: "" });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
    setNotification("");
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this record?");
    if (isConfirmed) {
      setProducts(products.filter((product) => product.id !== id));
      setNotification({ message: "Record deleted successfully!", type: "error" });
    }
  };
  

  const closeNotification = () => {
    setNotification("");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Product Master</h2>
      {notification.message && (
        <div
          className={`mb-4 p-4 rounded-lg flex justify-between items-center ${
            notification.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}
        >
          <span>{notification.message}</span>
          <button
            className="text-red-500 hover:text-red-700 font-bold"
            onClick={closeNotification}
          >
            ✕
          </button>
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border rounded px-3 py-2 mr-2"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border rounded px-3 py-2 mr-2"
        />
        <button
          onClick={handleCreate}
          className={`${
            isEditing ? "bg-yellow-500" : "bg-blue-500"
          } text-white px-4 py-2 rounded-lg hover:bg-opacity-90`}
        >
          {isEditing ? "Update" : "Create"}
        </button>
      </div>

      <table className="table-auto w-full border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-4 border">ID</th>
            <th className="p-4 border">Name</th>
            <th className="p-4 border">Price</th>
            <th className="p-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="p-4 border">{product.id}</td>
              <td className="p-4 border">{product.name}</td>
              <td className="p-4 border">{product.price}</td>
              <td className="p-4 border">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition mr-2"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                   className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                   onClick={() => handleDelete(product.id)}
                  >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCRUD;
