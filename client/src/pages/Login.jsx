import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

const inputStyle = {
  border: "none",
  borderBottom: "solid black 1px",
  outline: "none",
};
const btnStyle = {
  width: "100%",
  backgroundColor: "purple",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "5px",
};

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("all fileds are required");
    }
    try {
      const url = "https://auth-mern-app-api-nine.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const detail = error?.details[0].message || "An error occurred";
        handleError(detail);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="shadow-lg p-4 rounded" style={{ width: "300px" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3 d-flex flex-column">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            placeholder="Enter your email..."
            className="styledInput p-2"
            style={inputStyle}
          />
        </div>
        <div className="mb-3 d-flex flex-column">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            placeholder="Enter your password..."
            className="styledInput p-2"
            style={inputStyle}
          />
        </div>
        <button type="submit" className="mb-3" style={btnStyle}>
          Login
        </button>
        <span className="">
          Don't have an account?
          <Link to="/login" style={{ textDecoration: "none", color: "purple" }}>
            Signup
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
