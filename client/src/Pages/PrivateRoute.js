import React from 'react';
import {Outlet } from 'react-router-dom';
import Login from './Login';

const PrivateRoute = ({auth}) => {
  return (
        auth?<Outlet/>:<Login/>
        
  );
};

export default PrivateRoute;
