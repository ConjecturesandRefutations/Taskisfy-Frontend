import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultProfile from '../images/defaultProfile.jpg'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [state, setState] = useState({
    defaultProfile: { defaultProfile },
  });

  const updateProfileImage = (imageUrl) => {
    setUser((prevUser) => ({ ...prevUser, image: imageUrl }));
    localStorage.setItem('user', JSON.stringify({ ...user, image: imageUrl }));
  };

  const authenticateUser = () => {
    setIsLoading(true);
    axios.get(`${API_URL}/auth/verify`, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
      });
  };

  const logOutUser = () => {
    axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
      .then(() => authenticateUser())
      .catch(() => authenticateUser());
  };

  const signUpUser = (formData) => {
    return axios.post(`${API_URL}/auth/signup`, formData, { withCredentials: true })
      .then((res) => {
        authenticateUser(); // auto-login after signup
        return res.data;
      });
  };

  const loginUser = (formData) => {
    return axios.post(`${API_URL}/auth/login`, formData, { withCredentials: true })
      .then((res) => {
        authenticateUser(); // update context after login
        return res.data;
      });
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        setUser,
        authenticateUser,
        logOutUser,
        signUpUser,
        loginUser,
        state,
        setState,
        updateProfileImage
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
