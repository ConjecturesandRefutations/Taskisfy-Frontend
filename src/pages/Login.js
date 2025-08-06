import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import { Input } from 'antd';
import backgroundImage from '../images/to-do-list.jpg'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
      	const errorDescription = error.response.data.message;
      	setErrorMessage(errorDescription);
    	})
  };
  
  return (
<div className="min-h-screen flex">

  {/* Left: Background Image */}
  <div
    className="relative w-1/2 bg-cover bg-center hidden md:block"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-7xl font-bold"
        style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)' }}
    >
      Taskify
    </h1>
  </div>

  {/* Right: Login Form */}
  <section
    id="loginInput"
    className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white"
  >
    <div className="max-w-md w-full">
      <h2 className="text-3xl font-bold mb-6">Login</h2>

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password:</label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
      )}

      <p className="mt-6 text-sm">
        Don't have an account yet?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  </section>
</div>

  )
}

export default LoginPage;