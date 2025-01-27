import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import Navbar from "./components/Navbar";
import DarkModeToggle from "./components/DarkModeToggle";
import { getAuthStatus, logoutUser } from "./utils/localStorageHelpers";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(getAuthStatus());

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(getAuthStatus());
  }, []);

  return (
    <Router>
      {isAuthenticated && (
        <Navbar onLogout={handleLogout}>
          <DarkModeToggle />
        </Navbar>
      )}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={() => setIsAuthenticated(true)} />
          }
        />
        <Route
          path="/edit-profile"
          element={
            isAuthenticated ? <EditProfile /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/add-item"
          element={isAuthenticated ? <AddItem /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit-item/:id"
          element={isAuthenticated ? <EditItem /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
