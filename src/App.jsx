import Login from "./components/Login";
import UsersList from "./components/UsersList.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { Route, Router, Routes } from "react-router-dom";
import Order from "./components/Order.jsx";
import Parameter from "./components/Parameter.jsx";
import { useState } from "react";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
  };
  return (
    <>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        ) : (
          <>
            <Route
              path="/user"
              element={<UsersList onLogout={handleLogout} />}
            />
            <Route path="/order" element={<Order onLogout={handleLogout} />} />
            <Route
              path="/parameter"
              element={<Parameter onLogout={handleLogout} />}
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
