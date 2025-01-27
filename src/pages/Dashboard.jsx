import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { getItems, saveItems } from "../utils/localStorageHelpers";
import { getQueryParam, updateQueryString } from "../utils/queryHelpers";
import { Plus, Trash2, Pencil } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(getQueryParam("page")) || 1);
  const [searchKeyword, setSearchKeyword] = useState(getQueryParam("search") || "");
  const itemsPerPage = 6;

  useEffect(() => {
    const storedItems = getItems();
    setItems(storedItems);
  }, []);

  useEffect(() => {
    updateQueryString("page", currentPage);
    updateQueryString("search", searchKeyword);
  }, [currentPage, searchKeyword]);

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <button
          onClick={() => navigate("/add-item")}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
        >
          <Plus className="mr-2" /> Add User
        </button>

      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchKeyword}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <table className="w-full border border-gray-300 dark:border-gray-700 dark:text-white">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="w-1/12 border border-gray-300 dark:border-gray-700 p-2">
              No
            </th>
            <th className="w-1/6 border border-gray-300 dark:border-gray-700 p-2">
              ID
            </th>
            <th className="w-2/6 border border-gray-300 dark:border-gray-700 p-2">
              Name
            </th>
            <th className="w-1/6 border border-gray-300 dark:border-gray-700 p-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                  {startIndex + index + 1}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                  {item.id}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                  {item.name}
                </td>
                <td className="flex border border-gray-300 dark:border-gray-700 p-2 justify-center">
                  <button
                    onClick={() => navigate(`/edit-item/${item.id}`)}
                    className="flex items-center bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 mr-2"
                  >
                    <Pencil size={16} className="mr-2"/> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="flex items-center bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    <Trash2 className="mr-2"/> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="border border-gray-300 dark:border-gray-700 p-2 text-center dark:text-gray-300"
                colSpan="4"
              >
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        totalItems={filteredItems.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Dashboard;
