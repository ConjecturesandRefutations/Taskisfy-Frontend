import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from 'antd';
import { useContext } from 'react';
import { AuthContext } from "./../context/auth.context";
import backgroundImage from '../images/task-list.jpg'

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  
const handleSubmit = (e) => {
  e.preventDefault();
  const requestBody = { email, password, name };

  axios.post(`${API_URL}/auth/signup`, requestBody)
    .then(() => {
      // Login user immediately after signup
      axios.post(`${API_URL}/auth/login`, { email, password })
        .then((response) => {
          storeToken(response.data.authToken);
          authenticateUser();
          navigate("/");
        })
        .catch((error) => {
          console.error("Failed to log in user after sign up:", error);
          setErrorMessage("Failed to log in user after sign up.");
        });
    })
    .catch((error) => {
      console.error("Signup error:", error);

      const errorDescription =
        error.response?.data?.message || "An unexpected error occurred during signup.";
      setErrorMessage(errorDescription);
    });
};
  
  return (
 <div className="min-h-screen flex">

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

  <section
    id="signupInput"
    className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white"
  >
    <div className="max-w-md w-full">
      <h2 className="text-3xl font-bold mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleName}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
      )}

      <p className="mt-6 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  </section>
</div>

  )
}

export default SignupPage;