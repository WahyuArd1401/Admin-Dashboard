import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItems, saveItems } from "../utils/localStorageHelpers";

function EditItem() {
  const { id } = useParams();
  const [itemName, setItemName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const items = getItems();
    const item = items.find((item) => item.id === parseInt(id));
    if (item) {
      setItemName(item.name);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleEditItem = (e) => {
    e.preventDefault();
    const items = getItems();
    const updatedItems = items.map((item) =>
      item.id === parseInt(id) ? { ...item, name: itemName } : item
    );
    saveItems(updatedItems);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-600">
      <form onSubmit={handleEditItem} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Name</h2>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditItem;
