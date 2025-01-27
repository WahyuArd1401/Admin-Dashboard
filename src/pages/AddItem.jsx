import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItems, saveItems } from "../utils/localStorageHelpers";

function AddItem() {
  const [itemName, setItemName] = useState("");
  const navigate = useNavigate();

  const handleAddItem = (e) => {
    e.preventDefault();
    const items = getItems();
    const newItem = {
      id: Date.now(),
      name: itemName,
    };
    saveItems([...items, newItem]);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-600">
      <form onSubmit={handleAddItem} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Add User</h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm">Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg dark:border-gray-700"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddItem;
