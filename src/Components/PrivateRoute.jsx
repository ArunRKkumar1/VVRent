import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';
import { useSelector } from 'react-redux';
import { selectJwt } from '../features/authSice.js';
import Loader from "./subComponent/Loader.jsx"

export default function PrivateRoute() {
  const token = useSelector(selectJwt);
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const valid = await isTokenValid(token);
      setIsValid(valid);
    };

    if (token) {
      validateToken();
    } else {
      setIsValid(false);
    }
  }, [token]);

  if (isValid === null) {
    // Optionally render a loading spinner or some placeholder while validation is pending
    return <Loader/>;
  }

  return isValid ? <Outlet /> : <Navigate to="/login"/> 
}
