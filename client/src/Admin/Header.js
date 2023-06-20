import React from 'react'
import {Navigate,useNavigate} from 'react-router-dom';
import '../css/admin.css'

function Header() {
        const navigate=useNavigate();
        const routeChange = (path) =>{
                navigate(path);
        }
        //log out functionality
        const logout=(event)=>{
                event.preventDefault();
                localStorage.clear();
                routeChange("/");
        }
  return (
    <div style={{backgroundColor:'#0C134F'}} className='head'><button id="logout" onClick={logout}>Log Out</button></div>
  )
}

export default Header