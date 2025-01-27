import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUser, updateAuthUser } from "../utils/localStorageHelpers";

function EditProfile() {
  const user = getAuthUser();
  const [name, setName] = useState(user.name);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    updateAuthUser({ name });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-600">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold text-center mb-4">Edit Profile</h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;