import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import RefreshHandler from "./components/RefreshHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivatedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/home"
          element={<PrivatedRoute element={<Home />} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
