import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/localStorageHelpers";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      const savedName = localStorage.getItem("authUser")
        ? JSON.parse(localStorage.getItem("authUser")).name
        : "Admin";

      const user = { name: savedName };
      loginUser(user);

      onLogin();
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[url(../public/images/wave.svg)] bg-contain bg-no-repeat bg-bottom font-display">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded drop-shadow-2xl w-100">
        <h2 className="text-2xl font-semibold mb-8 mt-2 text-center">Login to your account</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
