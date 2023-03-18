import React from 'react';
import {Routes, Route,useNavigate, Outlet } from 'react-router-dom';
import Reset from './Reset';
import Login from './Login';

const PrivateRoute = ({auth}) => {
        const navigate = useNavigate();
        const routeChange = (path) =>{  
                navigate(path);
              }
              //console.log(element);
  return (
    //console.log(auth)
        auth?<Outlet/>:<Login/>
        
  );
};

export default PrivateRoute;
